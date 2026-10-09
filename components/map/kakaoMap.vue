<template>
    <div id="map" class="relative w-full h-[400px] overflow-hidden rounded-xl bg-slate-100">
        <!-- Kakao 지도를 사용할 수 있을 때 표시되는 실제 지도 컨테이너입니다. -->
        <!-- 로딩 중에도 실제 크기를 유지해야 Kakao가 필요한 지도 타일 수를 올바르게 계산합니다. -->
        <div v-show="mapMode !== 'fallback'" ref="mapContainer" class="h-full w-full"></div>

        <!-- 키가 없거나 로드에 실패해도 빈 화면이 되지 않도록 로컬 좌표 지도를 제공합니다. -->
        <svg
            v-if="mapMode === 'fallback'"
            viewBox="0 0 1000 400"
            role="img"
            aria-labelledby="fallback-map-title fallback-map-description"
            class="h-full w-full bg-[#eef5f8]"
        >
            <title id="fallback-map-title">서울시 도서관 위치 지도</title>
            <desc id="fallback-map-description">저장소에 포함된 서울시 도서관 좌표를 표시한 대체 지도</desc>
            <rect width="1000" height="400" fill="#eef5f8" />
            <path d="M0 235 C170 195 330 255 500 218 C675 180 820 235 1000 190" fill="none" stroke="#9dd8ee" stroke-width="24" opacity="0.9" />
            <path d="M0 235 C170 195 330 255 500 218 C675 180 820 235 1000 190" fill="none" stroke="#dff4fb" stroke-width="10" />
            <g stroke="#cbd5e1" stroke-width="1" opacity="0.75">
                <path v-for="line in guideLines" :key="line" :d="line" fill="none" />
            </g>
            <g>
                <circle
                    v-for="marker in fallbackMarkers"
                    :key="marker.id"
                    :cx="marker.x"
                    :cy="marker.y"
                    :r="selectedLibraryId === marker.id ? 7 : 3.5"
                    :fill="selectedLibraryId === marker.id ? '#ef4444' : '#2563eb'"
                    :opacity="selectedLibraryId === marker.id ? 1 : 0.72"
                >
                    <title>{{ marker.name }}</title>
                </circle>
            </g>
            <g v-if="myLocationPoint">
                <circle :cx="myLocationPoint.x" :cy="myLocationPoint.y" r="12" fill="#22c55e" opacity="0.2" />
                <circle :cx="myLocationPoint.x" :cy="myLocationPoint.y" r="5" fill="#16a34a" />
            </g>
        </svg>

        <div
            v-if="mapMode === 'loading'"
            class="absolute inset-0 flex items-center justify-center text-sm text-slate-600"
            role="status"
        >
            지도를 불러오는 중입니다.
        </div>
        <p
            v-if="mapMode === 'fallback'"
            class="absolute left-3 top-3 z-10 rounded-md bg-white/90 px-3 py-2 text-xs text-slate-700 shadow"
        >
            서울시 도서관 좌표 지도
        </p>
        <button type="button"
            class="absolute right-3 bottom-3 z-10 rounded-md bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
            @click="centerToMyLocation" :disabled="loading" aria-label="내 위치로 이동">
            {{ loading ? '위치 확인 중…' : '📍 내 위치로 이동' }}
        </button>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import seoulCurrentLibrary from '../../public/data/seoulCurrentLibrary.json'
const config = useRuntimeConfig();

// ✅ map container DOM 참조
const mapContainer = ref(null)
let map
let myMarker = null
const loading = ref(false)
const mapMode = ref('loading')
const selectedLibraryId = ref(null)
const myLocation = ref(null)

// 서울 영역을 SVG 좌표로 변환합니다. 외부 서버로 위치 데이터를 전송하지 않습니다.
const SEOUL_BOUNDS = { minLat: 37.42, maxLat: 37.72, minLng: 126.76, maxLng: 127.2 }
const projectPoint = (lat, lng) => ({
    x: ((lng - SEOUL_BOUNDS.minLng) / (SEOUL_BOUNDS.maxLng - SEOUL_BOUNDS.minLng)) * 1000,
    y: 400 - ((lat - SEOUL_BOUNDS.minLat) / (SEOUL_BOUNDS.maxLat - SEOUL_BOUNDS.minLat)) * 400,
})

const fallbackMarkers = computed(() => seoulCurrentLibrary.DATA
    .map((library) => {
        const lat = parseFloat(library.xcnts)
        const lng = parseFloat(library.ydnts)
        return {
            id: library.lbrry_seq_no,
            name: library.lbrry_name,
            ...projectPoint(lat, lng),
        }
    })
    .filter((marker) => marker.x >= 0 && marker.x <= 1000 && marker.y >= 0 && marker.y <= 400))

const myLocationPoint = computed(() => myLocation.value
    ? projectPoint(myLocation.value.lat, myLocation.value.lng)
    : null)

const guideLines = [
    'M80 50 L260 360', 'M220 20 L420 380', 'M390 10 L565 390',
    'M560 15 L710 380', 'M730 25 L900 365', 'M40 100 L960 80',
    'M25 170 L980 145', 'M20 300 L965 280', 'M120 360 L930 335',
]

const useFallbackMap = () => {
    mapMode.value = 'fallback'
}

// ✅ 부모에서 호출할 수 있게 노출
const moveTo = (lat, lng) => {
    const selected = seoulCurrentLibrary.DATA.find((library) =>
        parseFloat(library.xcnts) === lat && parseFloat(library.ydnts) === lng)
    selectedLibraryId.value = selected?.lbrry_seq_no ?? null

    if (map && window.kakao?.maps) {
        const moveLatLng = new window.kakao.maps.LatLng(lat, lng)
        map.setCenter(moveLatLng)
    }
}

const resetTo = () => {
    selectedLibraryId.value = null
    if (map && window.kakao?.maps) {
        const seoulLatLng = new window.kakao.maps.LatLng(37.5665, 126.9780)
        map.setCenter(seoulLatLng)
    }
}

const loadKakaoMapScript = () => {
    const apiKey = config.public.kakaoMapAPI

    if (!apiKey || apiKey === 'demo') {
        useFallbackMap()
        return
    }

    // 이미 카카오 맵 스크립트가 로드되었는지 확인하여 중복 로딩을 막습니다.
    if (window.kakao && window.kakao.maps) {
        initMap()
        return
    }

    const script = document.createElement('script')
    script.onload = () => {
        if (!window.kakao?.maps) {
            useFallbackMap()
            return
        }
        window.kakao.maps.load(initMap)
    }
    script.onerror = useFallbackMap

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    document.head.appendChild(script)
}

const initMap = async () => {
    // 템플릿 참조(ref)를 사용하여 맵 컨테이너에 접근합니다.
    if (!mapContainer.value) {
        console.error("맵 컨테이너 요소를 찾을 수 없습니다.")
        return
    }

    // ✅ 지도 초기 설정
    map = new window.kakao.maps.Map(mapContainer.value, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 6
    })
    mapMode.value = 'kakao'


    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
    const imageSize = new window.kakao.maps.Size(24, 35)
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)


    seoulCurrentLibrary.DATA.forEach((library) => {
        const lat = parseFloat(library.xcnts)
        const lng = parseFloat(library.ydnts)

        const position = new window.kakao.maps.LatLng(lat, lng)

        const marker = new window.kakao.maps.Marker({
            map,
            position,
            image: markerImage,
            title: library.lbrry_name
        })

        const infoContent = `
  <div style="
    width:220px; 
    padding:10px; 
    font-size:13px; 
    line-height:1.4; 
    word-break:keep-all; 
    box-sizing:border-box;">
    <strong style="display:block; margin-bottom:5px; font-size:14px;">${library.lbrry_name}</strong>
    <div>📍 ${library.adres}</div>
    <div>🕒 ${library.op_time || '제공 정보 없음'}</div>
    <div>❌ ${library.fdrm_close_date || '제공 정보 없음'}</div>
  </div>
`

        const infowindow = new window.kakao.maps.InfoWindow({
            content: infoContent
        })

        // 마커에 마우스 오버 시 정보창 표시
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(map, marker)
        })

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close()
        })


        // // ✅ 마커 생성
        // const marker = new window.kakao.maps.Marker({
        //     map,
        //     position: new window.kakao.maps.LatLng(37.5665, 126.9780)
        // })

        // // ✅ 정보창 생성
        // const infowindow = new window.kakao.maps.InfoWindow({
        //     content: '<div style="padding:5px;">서울시청</div>'
        // })

        // infowindow.open(map, marker)

    }
    )

    // 숨겨진 컨테이너에서 초기화한 뒤 실제 크기가 반영되면 타일을 다시 계산합니다.
    await nextTick()
    window.kakao.maps.event.trigger(map, 'resize')
    map.setCenter(new window.kakao.maps.LatLng(37.5665, 126.9780))
}

/** 버튼 핸들러: 현재 위치로 지도 이동 + 마커 표시 */
const centerToMyLocation = async () => {
    if (!map) return
    if (!('geolocation' in navigator)) {
        alert('이 브라우저는 위치 정보를 지원하지 않습니다.')
        return
    }

    loading.value = true
    const opts = { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }

    navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
            const { latitude: lat, longitude: lng } = coords
            myLocation.value = { lat, lng }

            if (!map || !window.kakao?.maps) {
                loading.value = false
                return
            }

            const pos = new window.kakao.maps.LatLng(lat, lng)

            // 지도 이동
            map.panTo(pos)

            // 기존 내 위치 마커 제거 후 다시 표시
            if (myMarker) myMarker.setMap(null)
            myMarker = new window.kakao.maps.Marker({
                map,
                position: pos
            })

            // 간단한 인포 윈도우
            const iw = new window.kakao.maps.InfoWindow({
                content: `
    <div style="
      display:flex;
      align-items:center;
      gap:6px;
      padding:8px 10px;
      border-radius:8px;
      color:dodgeblue;
      font-size:13px;
      font-weight:500;
    ">
      <span style="font-size:16px;">📍</span>
      <span>지금 나의 위치</span>
    </div>
  `
            })
            iw.open(map, myMarker)

            loading.value = false
        },
        (err) => {
            console.warn('현재 위치 획득 실패:', err)
            loading.value = false
            alert('현재 위치를 가져오지 못했어요. 위치 권한을 확인해주세요.')
        },
        opts
    )
}


onMounted(() => {
    loadKakaoMapScript()
})

defineExpose({
    moveTo,
    resetTo
})

</script>


<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>

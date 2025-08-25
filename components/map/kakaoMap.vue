<template>
    <div id="map" ref="mapContainer" class="w-full h-[400px]">
        <button type="button"
            class="absolute right-3 bottom-3 z-10 rounded-md bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
            @click="centerToMyLocation" :disabled="loading" aria-label="내 위치로 이동">
            {{ loading ? '위치 확인 중…' : '📍 내 위치로 이동' }}
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import seoulCurrentLibrary from '../../public/data/seoulCurrentLibrary.json'
const config = useRuntimeConfig();

// ✅ map container DOM 참조
const mapContainer = ref(null)
let map
let myMarker = null
const loading = ref(false)

// ✅ 부모에서 호출할 수 있게 노출
const moveTo = (lat, lng) => {
    if (!map) return
    const moveLatLng = new window.kakao.maps.LatLng(lat, lng)
    map.setCenter(moveLatLng)
}

const resetTo = () => {
    if (!map) return
    const seoulLatLng = new window.kakao.maps.LatLng(37.5665, 126.9780)
    map.setCenter(seoulLatLng)
}

const loadKakaoMapScript = () => {
    // 이미 카카오 맵 스크립트가 로드되었는지 확인하여 중복 로딩을 막습니다.
    if (window.kakao && window.kakao.maps) {
        initMap()
        return
    }

    const script = document.createElement('script')
    script.onload = () => {

        window.kakao.maps.load(() => {
            initMap()
        })
    }

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${config.public.kakaoMapAPI}&autoload=false`
    document.head.appendChild(script)
}

const initMap = () => {
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

        // ✅ 지도 리사이즈 트리거 (필요한 경우)
        window.kakao.maps.event.trigger(map, 'resize')

    }
    )
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

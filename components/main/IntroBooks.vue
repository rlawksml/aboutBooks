<template>
    <div class="flex flex-col items-center justify-center">
        <div class="mr-10 shrink-1 min-w-1/2">
            <figure class="w-full max-w-[300px] min-w-[250px] mb-5">
                <img :src="selectBook.bookImg" alt="책 이미지">
            </figure>
        </div>
        
        <div class="flex flex-col items-start justify-start px-10 w-[80%] max-w-[800px] break-keep" >
            <p class="mb-2 text-xl font-bold title">{{selectBook.title}}</p>
            <p class="mb-5 desc">{{reduceLetter(selectBook.desc)}}</p>


            <default-buttons text="버튼">
                    <a :href="selectBook.link" target="_blank">자세히 보기</a>
            </default-buttons>
 
        </div>
    </div>
</template>

<script setup lang="ts">
import bookImage1 from '~/assets/images/book1.jpg'
import bookImage2 from '~/assets/images/book2.jpg'

const initBookList = [
    {
        title: "마흔에 읽는 쇼펜하우어",
        desc:"마흔의 마음은 복잡하다. 그동안 수많은 시험을 치르고 자리 잡기 시작했지만, 한참 남은 인생이 기대되기보다 늘 그렇듯 같은 일상이 반복될 것이라는 생각을 하게 된다. 벌써부터 웬만한 일은 재미가 없고 뻔하게 느껴진다. 언제부터인가 “산다는 것은 괴로운 것이다”라는 말에 고개를 끄덕이게 됐다. 행복, 고통, 인생에 대해 고민하기 시작한 당신에게 쇼펜하우어의 조언이 필요할 때다.",
        link:"https://product.kyobobook.co.kr/detail/S000208779631",
        bookImg: bookImage1
    },
    {
        title: "초역 부처의 말",
        desc:"2500년 동안 사람들에게 사랑받으며 회자되어 온 부처의 말을 코이케 류노스케 스님이 현대어로 재해석해 책으로 출간했다. 간결하게 축약된 핵심만을 담은 부처의 메시지는, 마음이 약해지고 어려움에 처한 사람들에게 힘과 용기를 불어넣어 준다. 부처의 말이 간결하듯 이 책의 기획 의도 역시 매우 단순하다. 저자는 서문에 독자들이 이 책을 손에 들고 어디를 펼치더라도 그곳에 적힌 부처의 말이 스르륵 마음을 물들이고, 어느 순간 그 속에서 기분 좋은 바람이 일어나 더 좋은 방향으로 이끌어 주길 바란다고 썼다.",
        link:"https://product.kyobobook.co.kr/detail/S000213310247",
        bookImg: bookImage2
    }
]

// const selectBook = ref(initBookList[0])

const reduceLetter = (text : string) : string => {
    return text.length >= 200 ? text.slice(0,200).concat('...'): text
}

const selectBook = useState('selectBook', ()=>{
    const randomNum = Math.floor(Math.random() * initBookList.length)
    return initBookList[randomNum]
})

// onMounted(()=>{
//     const randomNum = Math.floor(Math.random() * initBookList.length)
//     selectBook.value = initBookList[randomNum]
// })

</script>

<style lang="stylus" scoped>

</style>
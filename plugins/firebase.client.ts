// plugins/firebase.client.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        storageBucket: config.public.firebaseStorageBucket,
        messagingSenderId: config.public.firebaseMessagingSenderId,
        appId: config.public.firebaseAppId,
    }

    // 로컬 포트폴리오 확인처럼 Firebase를 사용하지 않는 환경에서는
    // 인증 초기화 오류로 공개 페이지 전체가 중단되지 않게 합니다.
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
        console.warn('[Firebase] 환경변수가 없어 로그인과 개인 도서 기록 기능을 비활성화합니다.')

        return {
            provide: {
                auth: null,
                db: null,
            },
        }
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)

    return {
        provide: {
            auth,
            db,
        },
    }
})

import { onAuthStateChanged } from 'firebase/auth'
import useLoginStore from '@/stores/login'
import type { Auth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
    const { $auth } = nuxtApp
    const loginStore = useLoginStore()
    // Import Auth type from firebase/auth and cast $auth


    onAuthStateChanged($auth as Auth, (user) => {
        if (user) {
            const userInfo = {
                id: user.email,
                name: user.displayName || 'user',
                email: user.email,
                uid: user.uid,
            }
            loginStore.setUser(userInfo)
            // localStorage에도 저장
            localStorage.setItem('user', JSON.stringify(userInfo))
        } else {
            loginStore.resetUserInfo()
            localStorage.removeItem('user')
        }
    })
})

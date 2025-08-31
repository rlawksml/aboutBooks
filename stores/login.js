import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

const useLoginStore = defineStore('loginStore', {
    state() {
        return {
            id: null,
            name: 'user',
            email: null,
            profileImage: null,
            pw: null,
            user: null,
            uuid: null,
            isLoggedIn: false,
            isLoginModalOpen: false,
            isRegisterModalOpen: false,
            isForgotPasswordModalOpen: false,
        };
    },
    actions: {
        async login({ auth, db, paramsId, paramsPw }) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, paramsId, paramsPw)

                const user = userCredential.user
                this.uuid = user.uid

                // Firestore에서 추가 정보 로딩 (예: 닉네임)
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    this.name = data.nickname || '사용자'
                }

                this.isLoggedIn = true;
                return true
            } catch (error) {
                console.error('로그인 실패:', error)
                throw new Error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
            }
        },

        async logout(auth) {
            try {
                await signOut(auth);
                this.resetUserInfo();
            } catch (error) {
                console.error('로그아웃 실패:', error)
                throw new Error('로그아웃에 실패했습니다.')
            }
        },

        async signup({ auth, db, paramsId, paramsPw, paramsName }) {

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, paramsId, paramsPw)

                const uid = userCredential.user.uid
                this.uuid = uid;

                await setDoc(doc(db, 'users', uid), {
                    email: paramsPw,
                    nickname: paramsName,
                    createdAt: new Date()
                });
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    throw new Error('이미 사용 중인 이메일입니다.')
                }
                // 그 외 에러
                console.error('회원가입 실패:', error)
                throw new Error('회원가입 중 오류가 발생했습니다.')
            }
        },

        getLocalStorageUser() {
            const savedUser = localStorage.getItem('user')
            if (savedUser) {
                const parsed = JSON.parse(savedUser)
                this.setUser(parsed)
            }
        },
        resetUserInfo() {
            this.id = null;
            this.name = 'user';
            this.email = null;
            this.profileImage = null;
            this.pw = null;
            this.user = null;
            this.uuid = null;
            this.isLoggedIn = false;
            this.isLoginModalOpen = false;
            this.isRegisterModalOpen = false;
            this.isForgotPasswordModalOpen = false;
        },
        openLoginModal() {
            this.isLoginModalOpen = true;
        },
        closeLoginModal() {
            this.isLoginModalOpen = false;
        },
        setUser(user) {
            this.user = user;
            this.id = user.id || null;
            this.name = user.name || '사용자';
            this.email = user.email || null;
            this.uuid = user.uid || null;
            this.isLoggedIn = true;
        }
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isLoggedIn,
    },
});
export default useLoginStore;
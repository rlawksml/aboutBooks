import { defineStore } from 'pinia';
const useLoginStore = defineStore('loginStore', {
    state() {
        return {
            id: null,
            name: null,
            email: null,
            profileImage: null,
            pw: null,
            user: null,
            isLoggedIn: false,
        };
    },
    actions: {
        login(user) {
            this.user = user;
            this.isLoggedIn = true;
        },
        logout() {
            this.user = null;
            this.isLoggedIn = false;
        },
        openLoginModal() {
            this.isLoginModalOpen = true;
        },
        closeLoginModal() {
            this.isLoginModalOpen = false;
        },
        setUser(user) {
            this.user = user;
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.profileImage = user.profileImage;
            this.pw = user.pw;
        },
        clearUser() {
            this.user = null;
            this.id = null;
            this.name = null;
            this.email = null;
            this.profileImage = null;
            this.pw = null;
            this.isLoggedIn = false;
        },
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isLoggedIn,
    },
});
export default useLoginStore;
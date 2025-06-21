<template>
    <div class="header">
        <nuxt-link to="/" class="text-3xl font-bold text-lime-600">
            <h2 class="text-lime-600 text-[60px]">About Books</h2>
        </nuxt-link>

        <nav class=" navigation">
            <ul>
                <li>
                    <nuxt-link to="/">
                        Home
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/search">
                        Search
                    </nuxt-link>
                </li>
                <li class="login" v-if="!isLoggedIn">
                    <button @click="openLoginModal">로그인</button>
                </li>
                <li  v-else>
                <nuxt-link to="/mypage">{{ nickname }}님</nuxt-link>
                <button class="login" @click="logout">로그아웃</button>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script setup lang="ts">

import { ref } from 'vue';

import useLoginStore from '~/stores/login';
const loginStore = useLoginStore();
const isLoggedIn = ref(loginStore.isLoggedIn);
const nickname = ref(loginStore.name);
const openLoginModal = () => {
    loginStore.openLoginModal();
};
const logout = () => {
    loginStore.logout();
};


</script>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 30px;
}

.navigation {
    width: 100%;
    display: flex;
    justify-content: end;
}

.navigation ul {
    display: flex;

    li {
        margin: 0 10px;
    }
}

.navigation a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

.navigation a:hover {
    color: #007bff;
}
.login {
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 0px 10px;
}
.login:hover {
    color: white;
    background-color: dodgerblue;
    padding: 0 10px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.login:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
</style>

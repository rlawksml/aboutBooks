<template>

    <div>
        <h1>마이 페이지</h1>
        <p>여기에 사용자 정보를 표시합니다.</p>
        <p>추가적인 기능은 추후에 구현될 예정입니다.</p>
    </div>

    <div>
        <p>현재 로그인 상태: {{ isLoggedIn ? '로그인됨' : '로그아웃됨' }}</p>
        <p>사용자 닉네임: {{ nickname }}</p>
        </div>

        <button @click="logout">로그아웃</button>
        <button @click="openProfileModal">프로필 수정</button>
                <button @click="">회원 탈퇴</button>

                <div>
                    <h2>내가 검색한 기록</h2>
                    <p>내가 검색한 기록이 여기에 표시되기</p>
                    <p>추가적인 기능은 추후에 구현될 예정입니다.</p>
                </div>

</template>
<script setup>
</script>
<style lang="scss" scoped>
</style>
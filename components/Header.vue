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
            </ul>
        </nav>
    </div>
</template>


<script setup lang="ts">

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
</style>

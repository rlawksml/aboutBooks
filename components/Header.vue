<template>
    <div class="header">

        <h2 class="text-gray-600 text-[60px]">About Books</h2>
        <nav class=" navigation">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Search</a></li>
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

.navigation{
    width: 100%;
    display: flex;
    justify-content: end;
}

.navigation ul {
    display: flex;
    li{
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




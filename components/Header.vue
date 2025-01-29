<template>
    <div class="header">
        <div class="logo">
            <!-- <img src="/path/to/logo.png" alt="Logo"> -->
        </div>
        <nav class="navigation">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
</template>


<script setup lang="ts">
    
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
}

.logo img {
    height: 40px;
}

.navigation ul {
    list-style: none;
    display: flex;
    gap: 20px;
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




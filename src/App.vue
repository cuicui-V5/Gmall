<template>
    <div>
        <headerVue></headerVue>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
    import headerVue from "@/components/header/header.vue";
</script>

<style scoped lang="less"></style>

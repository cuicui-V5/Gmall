<template>
    <div>
        <headerVue></headerVue>
        <button @click="log">click</button>
        <router-view></router-view>
        <footerVue v-if="router.meta.showFooter"></footerVue>
    </div>
</template>

<script setup lang="ts">
    import headerVue from "@/components/header/index.vue";
    import footerVue from "@/components/footer/index.vue";
    import { useRoute } from "vue-router";
    const router = useRoute();
    function log() {
        console.log(router.meta);
    }
</script>

<style scoped lang="less"></style>

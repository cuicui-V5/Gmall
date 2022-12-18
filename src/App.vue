<template>
    <div>
        <headerVue></headerVue>
        <router-view></router-view>
        <footerVue v-if="router.meta.showFooter"></footerVue>
    </div>
</template>

<script setup lang="ts">
    import headerVue from "@/components/header/index.vue";
    import footerVue from "@/components/footer/index.vue";
    import { useRoute } from "vue-router";
    import { useHomeStore } from "@/stores/home/index";
    const router = useRoute();
    const store = useHomeStore();

    store.getCategoryList();
</script>

<style scoped lang="less"></style>

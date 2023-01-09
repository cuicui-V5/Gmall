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
    import { onMounted } from "vue";
    import { useUserStore } from "./stores/user";
    const router = useRoute();
    const homeStore = useHomeStore();
    const userStore = useUserStore();

    onMounted(() => {
        homeStore.getCategoryList();
        userStore.getUserInfo();
    });
</script>

<style scoped lang="less"></style>

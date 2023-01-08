<template>
    <typeNavVue></typeNavVue>
    <listContainerVue></listContainerVue>
    <todayRecommend></todayRecommend>
    <rank></rank>
    <like></like>
    <floor
        v-for="floor in homeStore.floorList"
        :floor="floor"
    ></floor>
    <brand></brand>
</template>

<script setup lang="ts">
    import listContainerVue from "./list-container/index.vue";
    import todayRecommend from "./today-recommend/index.vue";
    import rank from "./rank/index.vue";
    import like from "./like/index.vue";
    import floor from "./floor/index.vue";
    import brand from "./brand/index.vue";
    import { useHomeStore } from "@/stores/home";
    import { useUserStore } from "@/stores/user";
    import { onMounted } from "vue";
    const homeStore = useHomeStore();
    const userStore = useUserStore();

    onMounted(async () => {
        homeStore.getFloor();
        userStore.getUserInfo();
    });
</script>

<style scoped lang="less"></style>

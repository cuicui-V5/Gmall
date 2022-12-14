<template>
    <button @click="add">add</button>
    <span>{{ store.categoryList }}</span>
    <typeNavVue></typeNavVue>
    <listContainerVue></listContainerVue>
    <todayRecommend></todayRecommend>
    <rank></rank>
    <like></like>
    <floor></floor>
    <floor></floor>
    <brand></brand>
</template>

<script setup lang="ts">
    import typeNavVue from "@/components/type-nav/index.vue";
    import listContainerVue from "./list-container/index.vue";
    import todayRecommend from "./today-recommend/index.vue";
    import rank from "./rank/index.vue";
    import like from "./like/index.vue";
    import floor from "./floor/index.vue";
    import brand from "./brand/index.vue";
    import { useHomeStore } from "@/stores/home";
    const store = useHomeStore();
    function add() {
        store.getCategoryList();
    }
</script>

<style scoped lang="less"></style>

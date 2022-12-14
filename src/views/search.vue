<template>
    <div>
        <h1>search</h1>
        {{ router.params }}
        <hr />
        {{ router.query }}
        <hr />
        <button @click="send">click</button>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";
    import { reqCategoryList } from "@/api/index";

    const router = useRoute();
    async function send() {
        const res = await reqCategoryList();
        console.log(res);
    }
</script>

<style scoped lang="less"></style>

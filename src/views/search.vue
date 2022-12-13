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
    import requests from "@/api/request";

    const router = useRoute();
    function send() {
        requests.get("http://baidu.com");
    }
</script>

<style scoped lang="less"></style>

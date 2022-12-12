<template>
    <div>
        <h1>search</h1>
        {{ router.params }}
        <hr />
        {{ router.query }}
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";

    const router = useRoute();
</script>

<style scoped lang="less"></style>

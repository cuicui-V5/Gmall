<template>
    <div class="spec-preview">
        <img :src="skuImageList[showImgIndex].imgUrl" />
        <div
            class="event"
            @mousemove="move($event)"
        ></div>
        <div class="big">
            <img
                ref="bigImg"
                :src="skuImageList[showImgIndex].imgUrl"
            />
        </div>
        <div
            class="mask"
            ref="mask"
        ></div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Zoom",
    };
</script>
<script lang="ts" setup>
    import type { SkuImageList } from "@/interface/index";
    import eventBus from "@/lib/eventBus";
    import { ref } from "vue";

    defineProps<{
        skuImageList: SkuImageList[];
    }>();
    const showImgIndex = ref(0);
    const mask = ref<HTMLDivElement>();
    const bigImg = ref<HTMLImageElement>();
    eventBus.on("changeIndex", (index) => {
        showImgIndex.value = index as number;
    });
    const move = (e: MouseEvent) => {
        // 获取鼠标在元素内的位置应该用offset
        // 计算mask的位置
        if (mask.value && bigImg.value) {
            const target = e.target as HTMLDivElement;
            const maskWidth = mask.value.offsetWidth;
            const maskHeight = mask.value.offsetHeight;
            let maskX = e.offsetX - maskWidth / 2;
            let maskY = e.offsetY - maskHeight / 2;

            // 越界处理
            if (maskX < 0) {
                maskX = 0;
            }
            if (maskX > target.offsetWidth - maskWidth) {
                maskX = target.offsetWidth - maskWidth;
            }
            if (maskY < 0) {
                maskY = 0;
            }
            if (maskY > target.offsetHeight - maskHeight) {
                maskY = target.offsetHeight - maskHeight;
            }
            // 设置遮罩位置
            mask.value.style.left = maskX + "px";
            mask.value.style.top = maskY + "px";
            // 设置big位置
            bigImg.value.style.left = -maskX * 2 + "px";
            bigImg.value.style.top = -maskY * 2 + "px";
        }
    };
</script>

<style lang="less">
    .spec-preview {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #ccc;

        img {
            width: 100%;
            height: 100%;
        }

        .event {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
        }

        .mask {
            width: 50%;
            height: 50%;
            background-color: rgba(0, 255, 0, 0.3);
            position: absolute;
            left: 0;
            top: 0;
            display: none;
        }

        .big {
            width: 100%;
            height: 100%;
            position: absolute;
            top: -1px;
            left: 100%;
            border: 1px solid #aaa;
            overflow: hidden;
            z-index: 998;
            display: none;
            background: white;

            img {
                width: 200%;
                max-width: 200%;
                height: 200%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }

        .event:hover ~ .mask,
        .event:hover ~ .big {
            display: block;
        }
    }
</style>

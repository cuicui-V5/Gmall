<template>
    <div class="swiper-container">
        <swiper
            :modules="modules"
            :slides-per-view="6"
            :slides-per-group="2"
            :space-between="50"
            navigation
        >
            <swiper-slide v-for="(item, index) in skuImageList">
                <img
                    :src="item.imgUrl"
                    @click="changeIndex(index)"
                    :class="{
                        active: currentIndex == index,
                    }"
                />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts">
    export default {
        name: "ImageList",
    };
</script>
<script lang="ts" setup>
    import { Swiper, SwiperSlide } from "swiper/vue";
    // import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import "swiper/css/scrollbar";
    import type { SkuImageList } from "@/interface/index";
    import { ref } from "vue";
    import eventBus from "@/lib/eventBus";
    const modules = [Navigation, Pagination, Scrollbar, A11y];
    const currentIndex = ref(0);
    const changeIndex = (index: number) => {
        currentIndex.value = index;
        eventBus.emit("changeIndex", currentIndex.value);
    };
    defineProps<{
        skuImageList: SkuImageList[];
    }>();
</script>

<style lang="less" scoped>
    .swiper-container {
        height: 56px;
        width: 412px;
        box-sizing: border-box;
        padding: 0 12px;

        .swiper-slide {
            width: 56px;
            height: 56px;

            img {
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
                padding: 2px;
                width: 50px;
                height: 50px;
                display: block;

                &.active {
                    border: 2px solid #f60;
                    padding: 1px;
                }

                &:hover {
                    border: 2px solid #f60;
                    padding: 1px;
                }
            }
        }

        .swiper-button-next {
            left: auto;
            right: 0;
        }

        .swiper-button-prev {
            left: 0;
            right: auto;
        }

        .swiper-button-next,
        .swiper-button-prev {
            box-sizing: border-box;
            width: 12px;
            height: 56px;
            background: rgb(235, 235, 235);
            border: 1px solid rgb(204, 204, 204);
            top: 0;
            margin-top: 0;
            &::after {
                font-size: 12px;
            }
        }
    }
</style>

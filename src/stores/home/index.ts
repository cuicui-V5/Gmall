import { ref, computed } from "vue";
import { defineStore } from "pinia";
// 引入api
import { reqCategoryList, reqBanner, reqFloor } from "@/api";
import type { floorList } from "@/interface/index";
export const useHomeStore = defineStore("home", () => {
    const categoryList = ref<any>({});
    const bannerList = ref<
        {
            id: number;
            imgUrl: string;
        }[]
    >([]);
    const floorList = ref<floorList[]>([]);
    async function getCategoryList() {
        categoryList.value = (await reqCategoryList()).data.data;
    }
    async function getBanner() {
        const res = (await reqBanner()).data;
        if (res.code == 200) {
            bannerList.value = res.data;
        }
        // console.log(res);
    }
    async function getFloor() {
        const res = (await reqFloor()).data;
        if (res.code == 200) {
            floorList.value = res.data;
        }
        console.log(res);
    }

    return {
        categoryList,
        bannerList,
        floorList,
        getCategoryList,
        getBanner,
        getFloor,
    };
});

import { ref, computed } from "vue";
import { defineStore } from "pinia";
// 引入api
import { reqCategoryList } from "@/api";

export const useHomeStore = defineStore("home", () => {
    const categoryList = ref<any>({});
    async function getCategoryList() {
        categoryList.value = (await reqCategoryList()).data.data;
    }

    return { categoryList, getCategoryList };
});

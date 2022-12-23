import { defineStore } from "pinia";
import { ref } from "vue";
import { reqSearchList } from "@/api/index";
import type { getSearchListParamsType, searchListType } from "@/interface";
export const useSearchStore = defineStore("search", () => {
    const searchList = ref<searchListType>();
    const getSearchList = async (params: getSearchListParamsType) => {
        const res = (await reqSearchList(params)).data;
        console.log(res);

        if ((res.code = 200)) {
            searchList.value = res.data;
        }
    };
    return {
        searchList,
        getSearchList,
    };
});

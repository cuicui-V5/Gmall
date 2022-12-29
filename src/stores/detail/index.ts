import { reqGoodsInfo } from "@/api";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { GoodsInfoType } from "@/interface/index";
export const useDetailStore = defineStore("detail", () => {
    const goodsInfo = ref() as Ref<GoodsInfoType>;
    const getGoodsInfo = async (skuId: number) => {
        const res = await reqGoodsInfo(skuId);
        console.log(res);
        if (res.data.code == 200) {
            goodsInfo.value = res.data.data;
        }
    };
    return {
        goodsInfo,
        getGoodsInfo,
    };
});

import { reqShopCart, reqDelShopCart, reqChangeChecked } from "@/api";
import type { shopCartInfo } from "@/interface";
import { getUuid } from "@/utils/getUuid";
import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useShopCartStore = defineStore("shopCart", () => {
    const uuidToken = ref(getUuid());
    const shopCartData = ref<shopCartInfo>();
    const getShopCart = async () => {
        const res = await reqShopCart();
        shopCartData.value = res.data.data[0];
    };
    const deleteChecked = async () => {
        const promiseArr: Array<Promise<AxiosResponse>> = [];
        shopCartData.value?.cartInfoList.forEach((item) => {
            if (item.isChecked == 1) {
                const promise = reqDelShopCart(item.skuId);
                promiseArr.push(promise);
            }
            return;
        });
        return Promise.all(promiseArr);
    };

    const changeAllChecked = async (isChecked: boolean | number) => {
        isChecked = isChecked ? 1 : 0;
        const promiseArr: Promise<AxiosResponse>[] = [];
        shopCartData.value?.cartInfoList.forEach((item) => {
            // 判断现在的选中状态和要改变的选中状态, 如果一样就不需要改了
            if (item.isChecked != isChecked) {
                const promise = reqChangeChecked(
                    item.skuId,
                    isChecked as 0 | 1,
                );
                promiseArr.push(promise);
            }
        });
        return Promise.all(promiseArr);
    };
    return {
        getShopCart,
        uuidToken,
        shopCartData,
        deleteChecked,
        changeAllChecked,
    };
});

import { reqShopCart } from "@/api";
import type { shopCartInfo } from "@/interface";
import { getUuid } from "@/utils/getUuid";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useShopCartStore = defineStore("shopCart", () => {
    const uuidToken = ref(getUuid());
    const shopCartData = ref<shopCartInfo>();
    const getShopCart = async () => {
        const res = await reqShopCart();
        shopCartData.value = res.data.data[0];
        console.log(shopCartData.value);
    };
    return { getShopCart, uuidToken, shopCartData };
});

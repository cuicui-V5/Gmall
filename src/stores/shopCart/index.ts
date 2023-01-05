import { reqShopCart } from "@/api";
import { getUuid } from "@/utils/getUuid";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useShopCartStore = defineStore("shopCart", () => {
    const uuidToken = ref(getUuid());
    const getShopCart = async () => {
        const res = await reqShopCart();
        console.log(res);
    };
    return { getShopCart, uuidToken };
});

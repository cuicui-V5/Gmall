import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { reqAddress, reqTardeInfo } from "./../../api/index";
import type { tradeInfoType } from "./../../interface/index";
export const useTradeStore = defineStore("trade", () => {
    const tardeInfo = ref<tradeInfoType>();
    const userAddressList = computed(() => {
        if (tardeInfo.value) {
            return tardeInfo.value.userAddressList;
        }
    });
    const getTradeInfo = async () => {
        const res = await reqTardeInfo();

        if (res.data.code == 200) {
            tardeInfo.value = res.data.data;
        }
    };
    return {
        tardeInfo,
        userAddressList,
        getTradeInfo,
    };
});

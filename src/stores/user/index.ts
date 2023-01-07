import { reqCode, reqRegister } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref();

    const getCode = async (phone: number) => {
        try {
            const res = await reqCode(phone);
            return res.data.data as number;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const register = async (phone: number, password: string, code: number) => {
        try {
            const userInfo = {
                phone,
                password,
                code,
            };
            const res = await reqRegister(userInfo);
            if (res.data.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        user,
        getCode,
        register,
    };
});

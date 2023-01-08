import { reqCode, reqRegister, reqLogin, reqUserInfo } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { userInfo } from "@/interface/index";
import { getToken, setToken } from "@/utils/token";

export const useUserStore = defineStore("user", () => {
    const user = ref<userInfo>();
    const token = ref(getToken());

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

    const login = async (phone: number, password: string) => {
        try {
            const userInfo = {
                phone,
                password,
            };
            const res = await reqLogin(userInfo);
            if (res.data.code == 200) {
                token.value = res.data.data.token;
                // 持久化存储token
                setToken(token.value);
                return "ok";
            } else {
                return Promise.reject(new Error("fail"));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };
    const getUserInfo = async () => {
        try {
            const res = await reqUserInfo();
            user.value = res.data.data;
        } catch (error) {
            alert((error as Error).message);
            return Promise.reject(error);
        }
    };
    return {
        user,
        token,
        getCode,
        register,
        login,
        getUserInfo,
    };
});

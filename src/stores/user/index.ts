import {
    reqCode,
    reqRegister,
    reqLogin,
    reqUserInfo,
    reqUserLogout,
} from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { userInfo } from "@/interface/index";
import { getToken, setToken, clearToken } from "@/utils/token";

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
                getUserInfo();
                // 持久化存储token
                if (token.value) {
                    setToken(token.value);
                    return "ok";
                } else {
                    return Promise.reject(new Error("fail"));
                }
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

    const logout = async () => {
        try {
            const res = await reqUserLogout();
            if (res.data.code == 200) {
                // 清空store与本地存储
                user.value = undefined;
                token.value = null;
                clearToken();
                return "ok";
            } else return Promise.reject(new Error("fail"));
        } catch (error) {
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
        logout,
    };
});

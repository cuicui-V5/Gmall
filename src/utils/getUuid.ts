import { v4 as uuid } from "uuid";

export const getUuid = () => {
    // 先读取本地存储 如果有uuid, 那么就不生成, 如果没有 就生成
    let uuidToken: string | null;
    uuidToken = localStorage.getItem("uuidToken");
    if (!uuidToken) {
        uuidToken = uuid();
        localStorage.setItem("uuidToken", uuidToken);
    }
    return uuidToken;
};

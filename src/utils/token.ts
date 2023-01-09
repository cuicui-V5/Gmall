export const setToken = (token: string) => {
    localStorage.setItem("TOKEN", token);
};

export const getToken = () => {
    return localStorage.getItem("TOKEN");
};

export const clearToken = () => {
    localStorage.removeItem("TOKEN");
};

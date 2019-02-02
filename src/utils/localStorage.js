export const getTokenFromStorage = () => localStorage.getItem("token");

export const setTokenToStorage = token => localStorage.setItem("token", token);

export const removeTokenFromStorage = () => localStorage.setItem("token", "");

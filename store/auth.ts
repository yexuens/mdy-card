export const getAuth = () => tt.getStorageSync('authUserInfo');
export const setAuth = (data: any) => tt.setStorageSync('authUserInfo', data);
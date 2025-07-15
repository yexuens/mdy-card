export const getUser = () => tt.getStorageSync('userInfo');
export const setUser = (data: any) => tt.setStorageSync('userInfo', data);
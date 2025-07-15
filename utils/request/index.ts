import { env } from "../../constants/env";

interface BaseResponse {
    code: string | number,
    msg: string
    record?: any | any[]
}

export const request = (option: {
    url: string,
    data: {
        dbName: string
    } & any
} & any): Promise<BaseResponse> => new Promise((reslove, reject) => {
    if (!option.data) {
        option.data = {
            dbName: env.dbName
        }
    }
    else if (!option.data?.dbName)
        option['data']['dbName'] = env.dbName
    tt.request({
        ...option,
        url: env.baseUrl + option.url,
        success: (res) => {
            reslove(res.data as unknown as BaseResponse)
        },
        fail: (res) => {
            reject(res)
        },
    });
})
export const httpGet = (url: string, data?: any) => request({
    url, data, method: 'GET'
})
export const httpPost = (url: string, data?: any) => request({
    url, data, method: 'POST'
})
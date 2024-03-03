import axios, { type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import { config } from '../config/index';
const service = axios.create({
    baseURL: '/',
    timeout: 10000,
    withCredentials: false,
});
const tech_path = "/technician/invitation/"
const user_path = "/user/wallet/"
const base_api = config.API_URL;
const get_fn = service.get;
const post_fn = service.post;

// service.interceptors.request.use((config) => {
//     const headers = {
//         Authorization: localStorage.getItem('Authorization') || '',
//     };
//     config.headers = headers;
//     return config;
// });
service.interceptors.response.use(
    response => {
        const {
            data: { code, data, msg },
        } = response;
        if (code === 200 || code === 100000) {
            return data;
        }
        switch (code) {
            case 100006: //  CODE失效
                location.href = location.origin;
                break;
            default:
                return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);
export enum BASE_PATH_TYPE_ENUM {
    'user' = "user",
    'tech' = "tech",
}
const BASE_PATH_TYPE_ENUM_LIST = [tech_path, user_path];


export default {
    get(url: string, params?: object, base_path: BASE_PATH_TYPE_ENUM = BASE_PATH_TYPE_ENUM.user): AxiosResponse['data'] {
        const _url = `${base_api}${BASE_PATH_TYPE_ENUM_LIST[base_path]}${url}`
        return get_fn(_url, { params })
    },
    post(url: string, params?: object, base_path: BASE_PATH_TYPE_ENUM = BASE_PATH_TYPE_ENUM.user): AxiosResponse['data'] {
        const _url = `${base_api}${BASE_PATH_TYPE_ENUM_LIST[base_path]}${url}`
        return post_fn(_url, params)
    }
}
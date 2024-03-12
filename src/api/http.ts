import axios, { type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import { config } from '../config/index';
import toast from "../tools/toast"
const service = axios.create({
    baseURL: 'https://api.aixiangdaojia.com',
    timeout: 10000,
    withCredentials: false,
});
const tech_path = "/technician/invitation/"
const user_path = "/user/wallet/"
const sys = "/system/"
const base_api = config.API_URL;
const get_fn = service.get;
const post_fn = service.post;

service.interceptors.request.use((config) => {
    const headers = {
        Authorization: localStorage.getItem('Authorization') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijk1MDFkYzcyLWYzYTAtNGYzYS1iMGIxLTFlOTQyYWQyZWNhYSIsImV4cCI6MTcxMDEyMTg0N30.USR-q_zzJjENtFyeZ8PKjUyjedMaAFg_WOYWDoc5Pf0',
        d: '1112233',
        model: 'iPhone 13 Pro Max',
        o: 'ios',
        os: 'iOS 15',
        p: '0',
        s: '3a09f0b92fa516d687f37a48391bfcad',
        t: '1704434162000',
        v: '1.0.1',
    } as any;
    config.headers = headers;
    return config;
});

service.interceptors.response.use(
    response => {
        const {
            data: { code, data, msg, page },
        } = response;
        if (code === 200 || code === 100000) {
            if (page) {
                return {
                    page, data
                }
            } else {
                return data;
            }
        }
        switch (code) {
            // case 100006: //  CODE失效
            //     location.href = location.origin;
            //     break;
            default:
                msg && toast(msg)
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
    "sys" = "sys",
}
const BASE_PATH_TYPE_ENUM_LIST = {
    [BASE_PATH_TYPE_ENUM.tech]: tech_path,
    [BASE_PATH_TYPE_ENUM.user]: user_path,
    [BASE_PATH_TYPE_ENUM.sys]: sys
};


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
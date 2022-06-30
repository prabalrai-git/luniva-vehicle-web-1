import { httpBase } from "./HttpBaseUtil"
import { httpBaseMul } from "./HttpBaseUtilMul"

export const fetch = (url, params) => {
    return httpBase().get(`/${url}`, params)
}

export const store = (url, data) => {
    return httpBase().post(`/${url}`, data)
}

export const update = (url, data) => {
    return httpBase().put(`/${url}`, data)
}

export const destroy = (url, id = '') => {
    return httpBase().delete(`/${url}/${id}`);
}

export const storeMul = (url, data) => {
    return httpBaseMul().post(`/${url}`, data)
}
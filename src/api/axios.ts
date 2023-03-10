import axios, { AxiosInstance } from "axios";

// APIURL
// const apiURLDomain = process.env.REACT_APP_API_URL_DOMAIN;



// const apiURLDomain = "http://192.168.1.212:8000";
const apiURLDomain = "http://192.168.0.101:8000";

// const apiURLDomain = "https://api.tetusya-site.link/"

export default axios.create({baseURL: apiURLDomain});

export const authAxios: AxiosInstance = axios.create({
    baseURL: apiURLDomain,
    headers: {"Content-Type": "application/json"},
    withCredentials: false,
});

// リクエスト前に割り込む処理
authAxios.interceptors.request.use(request => {
    console.log('Starting Request: ', request.url)
    return request
})

import { AxiosError } from 'axios';
import { getValueFor } from "../hooks/useSecureStore";


export const getIsHaveJwt = () => {
    getValueFor("accessToken")
}

export const isResHaveLoginRequired = (res : object) => {
    let result = false
    if ('loginRequired' in res){
        result = true
    }
    return result
}

export const setIsLoginRequiredInRes = (res: any, response: any) => {
    if (res.status === 401){ response.loginRequired = true}
    return response
}

export const isEmpltyObj = (obj: object) => {
    for(let i in obj){
        return false;
    }
    return true;
}

export const increment = (index: number) => { 
    let result = index + 1
    return result
}
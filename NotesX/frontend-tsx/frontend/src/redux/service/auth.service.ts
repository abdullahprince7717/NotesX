import axiosInstance from "../../common/utils/axiosInstance";
import * as APIS from "../../common/utils/constants/api.constants";

export function USER_SIGNIN_API(userInfo: any) {
    return axiosInstance.post(APIS.LOGIN_API, userInfo)
        .then((res) => {
            return { response: res.data };
        })
        .catch((error) => {
            return { error };
        });
}

export function USER_SIGNUP_API(userInfo: any) {
    return axiosInstance.post(APIS.SIGNUP_API, userInfo)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function USER_LOGOUT_API() {
    return axiosInstance.post(APIS.LOGOUT_API)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function USER_VERIFY_EMAIL_API(userInfo: any) {
    return axiosInstance.post(APIS.VERIFY_EMAIL_API, userInfo)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function USER_VERIFY_OTP_API(userInfo: any) {
    return axiosInstance.get(`${APIS.VERIFY_OTP_API}?email=${userInfo.email}&code=${userInfo.otp}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
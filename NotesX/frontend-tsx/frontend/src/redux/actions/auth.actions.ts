import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    CLEAR_ERROR,
    CLEAR_SIGNUP_SUCCESS,

} from '../../common/utils/constants/auth.constants';

export const authActionCreator = {
    loginRequest: (userInfo: any) => ({
        type: LOGIN_REQUEST,
        payload: userInfo,
    }),

    logoutRequest: () => ({
        type: LOGOUT_REQUEST,
    }),

    signupRequest: (userInfo: any) => ({
        type: SIGNUP_REQUEST,
        payload: userInfo,
    }),

    loginSuccess: (userInfo: any) => ({
        type: LOGIN_SUCCESS,
        payload: userInfo,
    }),

    loginFailure: (error: string) => ({
        type: LOGIN_FAILURE,
        payload: error,
    }),

    logoutSuccess: () => ({
        type: LOGOUT_SUCCESS,
    }),

    logoutFailure: (error: string) => ({
        type: LOGOUT_FAILURE,
        payload: error,
    }),

    signupSuccess: (userInfo: any) => ({
        type: SIGNUP_SUCCESS,
        payload: userInfo,
    }),

    signupFailure: (error: string) => ({
        type: SIGNUP_FAILURE,
        payload: error,
    }),

    verifyEmailRequest: (userInfo: any) => ({
        type: VERIFY_EMAIL_REQUEST,
        payload: userInfo,
    }),

    verifyEmailSuccess: () => ({
        type: VERIFY_EMAIL_SUCCESS,
    }),

    verifyEmailFailure: (error: string) => ({
        type: VERIFY_EMAIL_FAILURE,
        payload: error,
    }),
    verifyOtpRequest: (userInfo: any) => ({
        type: VERIFY_OTP_REQUEST,
        payload: userInfo,
    }),
    verifyOtpSuccess: () => ({
        type: VERIFY_OTP_SUCCESS,
    }),
    verifyOtpFailure: (error: string) => ({
        type: VERIFY_OTP_FAILURE,
        payload: error,
    }),
    clearError: () => ({
        type: CLEAR_ERROR,
    }),
    clearSignupSuccess: () => ({
        type: CLEAR_SIGNUP_SUCCESS,
    }),

}





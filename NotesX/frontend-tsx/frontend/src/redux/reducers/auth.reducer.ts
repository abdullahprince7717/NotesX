import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
    VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE, CLEAR_ERROR, CLEAR_SIGNUP_SUCCESS,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE
} from '../../common/utils/constants/auth.constants';


const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    loading: false,
    error: '',
    isVerified: false,
    signupSuccess: false
}

const authReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                loading: false
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                signupSuccess: true,
                user: action.payload.user
            }
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: { response: { user: { userId: "" } } }, // due to issue in logout!
                loading: false
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                loading: false,
                error: action.payload.error
            }
        case VERIFY_EMAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,

            }
        case VERIFY_EMAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case VERIFY_OTP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                isVerified: true
            }
        case VERIFY_OTP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }
        case CLEAR_SIGNUP_SUCCESS:
            return {
                ...state,
                signupSuccess: false
            }
        default:
            return state;
    }
}

export default authReducer;
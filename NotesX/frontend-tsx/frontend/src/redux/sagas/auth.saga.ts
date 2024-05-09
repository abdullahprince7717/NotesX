import { USER_SIGNIN_API, USER_SIGNUP_API, USER_VERIFY_EMAIL_API, USER_VERIFY_OTP_API } from "../service/auth.service";
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE
} from "../../common/utils/constants/auth.constants";
import { toast } from "react-toastify";


function* loginSaga(action: any): Generator<any, void, any> {
    try {
        const user = yield call(USER_SIGNIN_API, action.payload);
        if (user.response) {
            yield put({ type: LOGIN_SUCCESS, payload: { user: user.response, isAuthenticated: true } });
        }
        else {
            yield put({ type: LOGIN_FAILURE, payload: { error: user.error.message } });
        }
    } catch (error: any) {
        yield put({ type: LOGIN_FAILURE, payload: { error: error.message } });
    }
}

function* signupSaga(action: any): Generator<any, void, any> {
    try {
        const user = yield call(USER_SIGNUP_API, action.payload);
        if (user.response) {
            yield put({ type: SIGNUP_SUCCESS, payload: { user: action.payload } });
        }
        else {
            toast.error(user.error?.response?.data?.error || 'Error in creating account');
            yield put({ type: SIGNUP_FAILURE, payload: { error: user.error } });
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.error || 'Error in creating account');
        yield put({ type: SIGNUP_FAILURE, payload: { error: error } });
    }
}

function* verifyEmailSaga(action: any): Generator<any, void, any> {
    try {
        yield call(USER_VERIFY_EMAIL_API, action.payload);
        yield put({ type: VERIFY_EMAIL_SUCCESS });
    } catch (error: any) {
        yield put({ type: VERIFY_EMAIL_FAILURE, payload: error.message });
    }
}

function* verifyOtpSaga(action: any): Generator<any, void, any> {
    try {
        yield call(USER_VERIFY_OTP_API, action.payload);
        yield put({ type: VERIFY_OTP_SUCCESS });
    } catch (error: any) {
        yield put({ type: VERIFY_OTP_FAILURE, payload: error.message });
    }
}



export default function* watchAuthActions() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(SIGNUP_REQUEST, signupSaga);
    yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmailSaga);
    yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
}



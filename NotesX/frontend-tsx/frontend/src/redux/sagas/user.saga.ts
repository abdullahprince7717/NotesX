import { call, put, takeLatest } from 'redux-saga/effects';
import {
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS,
    GET_USERS_REQUEST, GET_USERS_SUCCESS,
    GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS,
    CLEAR_USERS_ERROR
} from '../../common/utils/constants/user.constants';
import { toast } from 'react-toastify';
import {
    GET_USERS_API,
    GET_USER_BY_ID_API,
    UPDATE_USER_API,
    DELETE_USER_API
} from '../service/user.service';

function* getUsersSaga(): Generator<any, void, any> {
    try {
        const response = yield call(GET_USERS_API);
        yield put({ type: GET_USERS_SUCCESS, payload: response.response });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* getUserByIdSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(GET_USER_BY_ID_API, action.payload);
        yield put({ type: GET_USER_BY_ID_SUCCESS, payload: response.response });
    } catch (error: any) {
        toast.error(error.message);
    }
}


function* updateUserSaga(action: any): Generator<any, void, any> {
    try {
        yield call(UPDATE_USER_API, action.payload);
        yield put({ type: UPDATE_USER_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* deleteUserSaga(action: any): Generator<any, void, any> {
    try {
        yield call(DELETE_USER_API, action.payload);
        yield put({ type: DELETE_USER_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* clearUsersErrorSaga(): Generator<any, void, any> {
    try {
        yield put({ type: CLEAR_USERS_ERROR });
    } catch (error: any) {
        toast.error(error.message);
    }
}

export default function* watchUserActions() {
    yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
    yield takeLatest(GET_USER_BY_ID_REQUEST, getUserByIdSaga);
    yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
    yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);
    yield takeLatest(CLEAR_USERS_ERROR, clearUsersErrorSaga);
}

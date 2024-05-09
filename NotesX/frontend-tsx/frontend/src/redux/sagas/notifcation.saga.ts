import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS,
    CREATE_NOTIFICATION_REQUEST, CREATE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_REQUEST, DELETE_NOTIFICATION_SUCCESS,
    MARK_AS_READ_REQUEST, MARK_AS_READ_SUCCESS
} from '../../common/utils/constants/notification.constants';
import { toast } from 'react-toastify';
import {
    GET_NOTIFICATIONS_API,
    CREATE_NOTIFICATION_API,
    DELETE_NOTIFICATION_API,
    MARK_AS_READ_API
} from '../service/notification.service';

function* getNotificationsSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(GET_NOTIFICATIONS_API, action.payload);
        yield put({ type: GET_NOTIFICATIONS_SUCCESS, payload: response.response });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* createNotificationSaga(action: any): Generator<any, void, any> {
    try {
        yield call(CREATE_NOTIFICATION_API, action.payload);
        yield put({ type: CREATE_NOTIFICATION_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* deleteNotificationSaga(action: any): Generator<any, void, any> {
    try {
        yield call(DELETE_NOTIFICATION_API, action.payload);
        yield put({ type: DELETE_NOTIFICATION_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* markAsReadSaga(action: any): Generator<any, void, any> {
    try {
        yield call(MARK_AS_READ_API, action.payload);
        yield put({ type: MARK_AS_READ_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

export default function* watchNotificationActions() {
    yield takeLatest(GET_NOTIFICATIONS_REQUEST, getNotificationsSaga);
    yield takeLatest(CREATE_NOTIFICATION_REQUEST, createNotificationSaga);
    yield takeLatest(DELETE_NOTIFICATION_REQUEST, deleteNotificationSaga);
    yield takeLatest(MARK_AS_READ_REQUEST, markAsReadSaga);
}

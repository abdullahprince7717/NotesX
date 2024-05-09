import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS,
    GET_TAGS_BY_USERID_REQUEST, GET_TAGS_BY_USERID_SUCCESS,
    CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS,
    DELETE_TAG_REQUEST, DELETE_TAG_SUCCESS,
    UPDATE_TAG_REQUEST, UPDATE_TAG_SUCCESS,
    ADD_TAG_TO_NOTE_REQUEST, ADD_TAG_TO_NOTE_SUCCESS,
    REMOVE_TAG_FROM_NOTE_REQUEST, REMOVE_TAG_FROM_NOTE_SUCCESS
} from '../../common/utils/constants/tag.constants';
import { toast } from 'react-toastify';
import {
    GET_TAGS_API,
    GET_TAGS_BY_USERID_API,
    CREATE_TAG_API,
    DELETE_TAG_API,
    UPDATE_TAG_API,
    ADD_TAG_TO_NOTE_API,
    REMOVE_TAG_FROM_NOTE_API
} from '../service/tag.service';

function* getTagsSaga(): Generator<any, void, any> {
    try {
        const response = yield call(GET_TAGS_API);
        yield put({ type: GET_TAGS_SUCCESS, payload: response.response });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* getTagsByUserIdSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(GET_TAGS_BY_USERID_API, action.payload);
        yield put({ type: GET_TAGS_BY_USERID_SUCCESS, payload: response.response.response });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* createTagSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(CREATE_TAG_API, action.payload);
        yield put({ type: CREATE_TAG_SUCCESS, payload: response.response.response });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* deleteTagSaga(action: any): Generator<any, void, any> {
    try {
        console.log('action.payload.......', action.payload);
        yield call(DELETE_TAG_API, action.payload);
        yield put({ type: DELETE_TAG_SUCCESS, payload: action.payload });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* updateTagSaga(action: any): Generator<any, void, any> {
    try {
        yield call(UPDATE_TAG_API, action.payload);
        yield put({ type: UPDATE_TAG_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* addTagToNoteSaga(action: any): Generator<any, void, any> {
    try {
        yield call(ADD_TAG_TO_NOTE_API, action.payload);
        yield put({ type: ADD_TAG_TO_NOTE_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* removeTagFromNoteSaga(action: any): Generator<any, void, any> {
    try {
        yield call(REMOVE_TAG_FROM_NOTE_API, action.payload);
        yield put({ type: REMOVE_TAG_FROM_NOTE_SUCCESS });
    } catch (error: any) {
        toast.error(error.message);
    }
}

export default function* watchTagActions() {
    yield takeLatest(GET_TAGS_REQUEST, getTagsSaga);
    yield takeLatest(GET_TAGS_BY_USERID_REQUEST, getTagsByUserIdSaga);
    yield takeLatest(CREATE_TAG_REQUEST, createTagSaga);
    yield takeLatest(DELETE_TAG_REQUEST, deleteTagSaga);
    yield takeLatest(UPDATE_TAG_REQUEST, updateTagSaga);
    yield takeLatest(ADD_TAG_TO_NOTE_REQUEST, addTagToNoteSaga);
    yield takeLatest(REMOVE_TAG_FROM_NOTE_REQUEST, removeTagFromNoteSaga);
}

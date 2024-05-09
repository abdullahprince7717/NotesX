import { GET_NOTES_API, GET_NOTES_BY_USERID_API, CREATE_NOTE_API, UPDATE_NOTE_API, DELETE_NOTE_API, GET_ALL_COLLABORATORS_API, ADD_COLLABORATOR_API, PIN_NOTE_API, REMOVE_COLLABORATOR_API, UNPIN_NOTE_API, ARCHIVE_NOTE_API, UNARCHIVE_NOTE_API, TRASH_NOTE_API, UNTRASH_NOTE_API, ADD_REMINDER_API, REMOVE_REMINDER_API, GET_REMINDERS_API, ADD_TAG_TO_NOTE_API, REMOVE_TAG_FROM_NOTE_API } from "../service/note.service";
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    CREATE_NOTE, CREATE_NOTE_SUCCESS, DELETE_NOTE, DELETE_NOTE_SUCCESS, GET_NOTES, GET_NOTES_SUCCESS,
    GET_NOTES_BY_USERID, GET_NOTES_BY_USERID_SUCCESS, UPDATE_NOTE, UPDATE_NOTE_SUCCESS, GET_ALL_COLLABORATORS,
    GET_ALL_COLLABORATORS_SUCCESS, ADD_COLLABORATOR_SUCCESS, ADD_COLLABORATOR, REMOVE_COLLABORATOR,
    PIN_NOTE_SUCCESS, PIN_NOTE, REMOVE_COLLABORATOR_SUCCESS, UNPIN_NOTE_SUCCESS, UNPIN_NOTE, ARCHIVE_NOTE,
    ARCHIVE_NOTE_SUCCESS, UNARCHIVE_NOTE_SUCCESS, UNARCHIVE_NOTE, TRASH_NOTE_SUCCESS, TRASH_NOTE, UNTRASH_NOTE_SUCCESS,
    UNTRASH_NOTE, ADD_REMINDER_SUCCESS, ADD_REMINDER, REMOVE_REMINDER_SUCCESS, REMOVE_REMINDER, GET_REMINDERS,
    GET_REMINDERS_SUCCESS, ADD_TAG_TO_NOTE_SUCCESS, ADD_TAG_TO_NOTE, REMOVE_TAG_FROM_NOTE_SUCCESS, REMOVE_TAG_FROM_NOTE
} from '../../common/utils/constants/note.constants';
import { toast } from "react-toastify";

function* getNotesSaga(action: any): Generator<any, void, any> {
    try {
        const getNotes = yield call(GET_NOTES_API, action.payload)
        if (getNotes.error) {
            toast.error(getNotes.error.message);
            return;
        }
        yield put({ type: GET_NOTES_SUCCESS, payload: { notes: getNotes.response.response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* getNotesByUserIdSaga(action: any): Generator<any, void, any> {
    try {
        const getNotes = yield call(GET_NOTES_BY_USERID_API, action.payload)
        if (getNotes.error) {
            toast.error(getNotes.error.message);
            return;
        }
        console.log('getNotes.response.response', getNotes.response.response);
        yield put({ type: GET_NOTES_BY_USERID_SUCCESS, payload: { notes: getNotes.response.response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* createNoteSaga(action: { payload: any }): Generator<any, void, any> {
    try {
        const response = yield call(CREATE_NOTE_API, action.payload)
        if (response.error) {
            toast.error(response.error.response.data.error.details[0].message);
            return;
        }
        yield put({ type: CREATE_NOTE_SUCCESS, payload: { note: response.response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* updateNoteSaga(action: { payload: { note_id: string } }): Generator<any, void, any> {
    try {
        const response = yield call(UPDATE_NOTE_API, action.payload)
        if (response.error) {
            toast.error(response.error.response.data.error.details[0].message || "Error in updating note");
            return;
        }
        yield put({ type: UPDATE_NOTE_SUCCESS, payload: { note: response.response.response.updateNote } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* deleteNoteSaga(action: { payload: string }): Generator<any, void, any> {
    try {
        const response = yield call(DELETE_NOTE_API, action.payload)
        yield put({ type: DELETE_NOTE_SUCCESS, payload: { noteId: response.response.response.noteId } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* getAllCollaboratorsSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(GET_ALL_COLLABORATORS_API)
        yield put({ type: GET_ALL_COLLABORATORS_SUCCESS, payload: { collaborators: response.response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* addCollaboratorSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(ADD_COLLABORATOR_API, action.payload)
        yield put({ type: ADD_COLLABORATOR_SUCCESS, payload: { collaborator: response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* removeCollaboratorSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(REMOVE_COLLABORATOR_API, action.payload)
        console.log('response', response);
        console.log('action.payload', action.payload);
        if (response.error) {
            toast.error(response.error.response.data.error || "Error in removing collaborator");
            return;
        }
        yield put({ type: REMOVE_COLLABORATOR_SUCCESS, payload: { collaborator: action.payload } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* pinNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(PIN_NOTE_API, action.payload)
        yield put({ type: PIN_NOTE_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* unpinNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(UNPIN_NOTE_API, action.payload)
        yield put({ type: UNPIN_NOTE_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* archiveNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(ARCHIVE_NOTE_API, action.payload)
        if (response.error) {
            toast.error(response.error.response.data.error.details[0].message || "Error in archiving note");
            return;
        }
        yield put({ type: ARCHIVE_NOTE_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* unarchiveNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(UNARCHIVE_NOTE_API, action.payload)
        if (response.error) {
            toast.error(response.error.response.data.error.details[0].message || "Error in unarchiving note");
            return;
        }
        yield put({ type: UNARCHIVE_NOTE_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* trashNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(TRASH_NOTE_API, action.payload)
        yield put({ type: TRASH_NOTE_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* restoreNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(UNTRASH_NOTE_API, action.payload)
        console.log('response&&&&&&&&&&&&&&&', response.response.response[1]);
        yield put({ type: UNTRASH_NOTE_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* addReminderSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(ADD_REMINDER_API, action.payload)
        yield put({ type: ADD_REMINDER_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* removeReminderSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(REMOVE_REMINDER_API, action.payload)
        yield put({ type: REMOVE_REMINDER_SUCCESS, payload: { note: response.response.response[1] } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* getRemindersSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(GET_REMINDERS_API, action.payload.userId);
        yield put({ type: GET_REMINDERS_SUCCESS, payload: { notes: response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* addTagToNoteSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(ADD_TAG_TO_NOTE_API, action.payload)
        yield put({ type: ADD_TAG_TO_NOTE_SUCCESS, payload: { note: response.response.response } });
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* removeTagFromNoteSaga(action: any): Generator<any, void, any> {
    try {
        console.log('action in saga', action);
        const response = yield call(REMOVE_TAG_FROM_NOTE_API, action.payload)
        yield put({ type: REMOVE_TAG_FROM_NOTE_SUCCESS, payload: { noteId: action.payload.noteId, tagId: action.payload.tagId } });
    } catch (error: any) {
        toast.error(error.message);
    }
}


export default function* watchNoteActions() {
    yield takeLatest(GET_NOTES, getNotesSaga);
    yield takeLatest(CREATE_NOTE, createNoteSaga);
    yield takeLatest(UPDATE_NOTE, updateNoteSaga);
    yield takeLatest(DELETE_NOTE, deleteNoteSaga);
    yield takeLatest(GET_NOTES_BY_USERID, getNotesByUserIdSaga);
    yield takeLatest(GET_ALL_COLLABORATORS, getAllCollaboratorsSaga);
    yield takeLatest(ADD_COLLABORATOR, addCollaboratorSaga);
    yield takeLatest(REMOVE_COLLABORATOR, removeCollaboratorSaga);
    yield takeLatest(PIN_NOTE, pinNoteSaga);
    yield takeLatest(UNPIN_NOTE, unpinNoteSaga);
    yield takeLatest(ARCHIVE_NOTE, archiveNoteSaga);
    yield takeLatest(UNARCHIVE_NOTE, unarchiveNoteSaga);
    yield takeLatest(TRASH_NOTE, trashNoteSaga);
    yield takeLatest(UNTRASH_NOTE, restoreNoteSaga);
    yield takeLatest(ADD_REMINDER, addReminderSaga);
    yield takeLatest(REMOVE_REMINDER, removeReminderSaga);
    yield takeLatest(GET_REMINDERS, getRemindersSaga);
    yield takeLatest(ADD_TAG_TO_NOTE, addTagToNoteSaga);
    yield takeLatest(REMOVE_TAG_FROM_NOTE, removeTagFromNoteSaga);


}
import axiosInstance from '../../common/utils/axiosInstance'
import * as APIS from '../../common/utils/constants/api.constants'


export function CREATE_NOTE_API(note: any) {
    return axiosInstance.post(APIS.CREATE_NOTE_API, note)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_NOTES_API() {
    return axiosInstance.get(APIS.GET_NOTES_API)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_NOTES_BY_USERID_API(userId: any) {
    return axiosInstance.get(APIS.GET_NOTES_BY_USERID_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function UPDATE_NOTE_API(note: any) {
    return axiosInstance.put(APIS.UPDATE_NOTE_API, note)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function DELETE_NOTE_API(noteId: any) {
    return axiosInstance.delete(APIS.DELETE_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_ALL_COLLABORATORS_API() {
    return axiosInstance.get(APIS.GET_ALL_COLLABORATORS_API)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function ADD_COLLABORATOR_API(info: any) {
    return axiosInstance.post(APIS.ADD_COLLABORATOR_API, info)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function REMOVE_COLLABORATOR_API(info: any) {
    return axiosInstance.post(APIS.REMOVE_COLLABORATOR_API, info)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function PIN_NOTE_API(noteId: any) {
    return axiosInstance.patch(APIS.PIN_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function UNPIN_NOTE_API(noteId: any) {
    return axiosInstance.patch(APIS.UNPIN_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function ARCHIVE_NOTE_API(noteId: any) {
    return axiosInstance.patch(APIS.ARCHIVE_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function UNARCHIVE_NOTE_API(noteId: any) {
    return axiosInstance.patch(APIS.UNARCHIVE_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function TRASH_NOTE_API(noteId: any) {
    return axiosInstance.patch(APIS.TRASH_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function UNTRASH_NOTE_API(noteId: any) {
    return axiosInstance.patch(APIS.UNTRASH_NOTE_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_ARCHIVED_NOTES_API(userId: any) {
    return axiosInstance.get(APIS.GET_ARCHIVED_NOTES_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_TRASHED_NOTES_API(userId: any) {
    return axiosInstance.get(APIS.GET_TRASHED_NOTES_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_PINNED_NOTES_API(userId: any) {
    return axiosInstance.get(APIS.GET_PINNED_NOTES_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_COLLABORATED_NOTES_API(userId: any) {
    return axiosInstance.get(APIS.GET_COLLABORATED_NOTES_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function ADD_REMINDER_API(info: any) {
    return axiosInstance.post(APIS.ADD_REMINDER_API, info)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function REMOVE_REMINDER_API(noteId: any) {
    return axiosInstance.post(APIS.REMOVE_REMINDER_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_REMINDERS_API(userId: any) {
    return axiosInstance.get(APIS.GET_REMINDERS_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_NOTE_VERSION_HISTORY_API(noteId: any) {
    return axiosInstance.get(APIS.GET_NOTE_VERSION_HISTORY_API + noteId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_UPCOMING_REMINDERS_API(userId: any) {
    return axiosInstance.get(APIS.GET_UPCOMING_REMINDERS_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function ADD_TAG_TO_NOTE_API(noteId: any, tagId: any) {
    return axiosInstance.post(APIS.ADD_TAG_TO_NOTE_API, { noteId, tagId })
        .then((res) => {
            return { response: res.data };
        })
        .catch((error) => {
            return { error };
        });
}

export function REMOVE_TAG_FROM_NOTE_API(noteId: any, tagId: any) {
    return axiosInstance.put(APIS.REMOVE_TAG_FROM_NOTE_API, noteId, tagId) // ISSUE HERE
        .then((res) => {
            return { response: res.data };
        })
        .catch((error) => {
            return { error };
        });
}

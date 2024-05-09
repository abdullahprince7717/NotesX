import axiosInstance from '../../common/utils/axiosInstance'
import * as APIS from '../../common/utils/constants/api.constants'

export function GET_TAGS_API() {
    return axiosInstance.get(APIS.GET_TAGS_API)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_TAGS_BY_USERID_API(userId: any) {
    return axiosInstance.get(APIS.GET_TAGS_BY_USERID_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function CREATE_TAG_API(tag: any) {
    return axiosInstance.post(APIS.CREATE_TAG_API, tag)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function DELETE_TAG_API(tagId: any) {
    return axiosInstance.delete(APIS.DELETE_TAG_API + tagId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function UPDATE_TAG_API(tag: any) {
    return axiosInstance.put(APIS.UPDATE_TAG_API, tag)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function ADD_TAG_TO_NOTE_API(info: any) {
    return axiosInstance.post(APIS.ADD_TAG_TO_NOTE_API, info)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function REMOVE_TAG_FROM_NOTE_API(info: any) {
    return axiosInstance.post(APIS.REMOVE_TAG_FROM_NOTE_API, info)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

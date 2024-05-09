import axiosInstance from '../../common/utils/axiosInstance'
import * as APIS from '../../common/utils/constants/api.constants'


export function GET_USERS_API() {
    return axiosInstance.get(APIS.GET_USERS_API)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function GET_USER_BY_ID_API(userId: any) {
    return axiosInstance.get(APIS.GET_USER_BY_ID_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function UPDATE_USER_API(user: any) {
    return axiosInstance.put(APIS.UPDATE_USER_API, user)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function DELETE_USER_API(userId: any) {
    return axiosInstance.delete(APIS.DELETE_USER_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}


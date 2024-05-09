import axiosInstance from '../../common/utils/axiosInstance'
import * as APIS from '../../common/utils/constants/api.constants'

export function GET_NOTIFICATIONS_API(userId: any) {
    return axiosInstance.get(APIS.GET_NOTIFICATIONS_API + userId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function CREATE_NOTIFICATION_API(notification: any) {
    return axiosInstance.post(APIS.CREATE_NOTIFICATION_API, notification)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function DELETE_NOTIFICATION_API(notificationId: any) {
    return axiosInstance.delete(APIS.DELETE_NOTIFICATION_API + notificationId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}

export function MARK_AS_READ_API(notificationId: any) {
    return axiosInstance.put(APIS.MARK_AS_READ_API + notificationId)
        .then((res) => {
            return { response: res.data }
        })
        .catch((error) => {
            return { error }
        })
}
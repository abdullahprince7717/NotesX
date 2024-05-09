import {
    GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS,
    CREATE_NOTIFICATION_REQUEST, CREATE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_REQUEST, DELETE_NOTIFICATION_SUCCESS,
    MARK_AS_READ_REQUEST, MARK_AS_READ_SUCCESS,
    CLEAR_NOTIFICATIONS_ERROR
} from '../../common/utils/constants/notification.constants';

export const notificationsActionCreator = {
    getNotificationsRequest: (userId: string) => ({
        type: GET_NOTIFICATIONS_REQUEST,
        payload: userId,
    }),

    getNotificationsSuccess: (notifications: any) => ({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: notifications,
    }),

    createNotificationRequest: (notificationData: any) => ({
        type: CREATE_NOTIFICATION_REQUEST,
        payload: notificationData,
    }),

    createNotificationSuccess: () => ({
        type: CREATE_NOTIFICATION_SUCCESS,
    }),

    deleteNotificationRequest: (notificationId: string) => ({
        type: DELETE_NOTIFICATION_REQUEST,
        payload: notificationId,
    }),

    deleteNotificationSuccess: () => ({
        type: DELETE_NOTIFICATION_SUCCESS,
    }),

    markAsReadRequest: (notificationId: string) => ({
        type: MARK_AS_READ_REQUEST,
        payload: notificationId,
    }),

    markAsReadSuccess: () => ({
        type: MARK_AS_READ_SUCCESS,
    }),

    clearNotificationsError: () => ({
        type: CLEAR_NOTIFICATIONS_ERROR,
    }),
};
import {
    GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS,
    CREATE_NOTIFICATION_REQUEST, CREATE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_REQUEST, DELETE_NOTIFICATION_SUCCESS,
    MARK_AS_READ_REQUEST, MARK_AS_READ_SUCCESS,
    CLEAR_NOTIFICATIONS_ERROR
} from '../../common/utils/constants/notification.constants';

const INITIAL_STATE = {
    notifications: [],
    loading: false,
    error: '',
};

const notificationsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_REQUEST:
        case CREATE_NOTIFICATION_REQUEST:
        case DELETE_NOTIFICATION_REQUEST:
        case MARK_AS_READ_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload,
            };

        case CREATE_NOTIFICATION_SUCCESS:
        case DELETE_NOTIFICATION_SUCCESS:
        case MARK_AS_READ_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case CLEAR_NOTIFICATIONS_ERROR:
            return {
                ...state,
                error: '',
            };

        default:
            return state;
    }
};

export default notificationsReducer;

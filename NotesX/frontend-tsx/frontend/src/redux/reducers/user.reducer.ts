import {
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS,
    GET_USERS_REQUEST, GET_USERS_SUCCESS,
    GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS,
    CLEAR_USERS_ERROR
} from '../../common/utils/constants/user.constants';

const INITIAL_STATE = {
    users: [],
    user: {},
    loading: false,
    error: '',
};

const usersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
        case GET_USERS_REQUEST:
        case GET_USER_BY_ID_REQUEST:
        case CREATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_USER_SUCCESS:
        case CREATE_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case CLEAR_USERS_ERROR:
            return {
                ...state,
                error: '',
            };

        default:
            return state;
    }
};

export default usersReducer;

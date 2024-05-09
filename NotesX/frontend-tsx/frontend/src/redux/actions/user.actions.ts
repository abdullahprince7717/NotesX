import {
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS,
    GET_USERS_REQUEST, GET_USERS_SUCCESS,
    GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS,
    CLEAR_USERS_ERROR
} from '../../common/utils/constants/user.constants';


export const usersActionCreator = {
    updateUserRequest: (userData: any) => ({
        type: UPDATE_USER_REQUEST,
        payload: userData,
    }),

    updateUserSuccess: () => ({
        type: UPDATE_USER_SUCCESS,
    }),

    getUsersRequest: () => ({
        type: GET_USERS_REQUEST,
    }),

    getUsersSuccess: (users: any) => ({
        type: GET_USERS_SUCCESS,
        payload: users,
    }),

    getUserByIdRequest: (userId: string) => ({
        type: GET_USER_BY_ID_REQUEST,
        payload: userId,
    }),

    getUserByIdSuccess: (user: any) => ({
        type: GET_USER_BY_ID_SUCCESS,
        payload: user,
    }),

    createUserRequest: (userData: any) => ({
        type: CREATE_USER_REQUEST,
        payload: userData,
    }),

    createUserSuccess: () => ({
        type: CREATE_USER_SUCCESS,
    }),

    deleteUserRequest: (userId: string) => ({
        type: DELETE_USER_REQUEST,
        payload: userId,
    }),

    deleteUserSuccess: () => ({
        type: DELETE_USER_SUCCESS,
    }),

    clearUsersError: () => ({
        type: CLEAR_USERS_ERROR,
    }),
};

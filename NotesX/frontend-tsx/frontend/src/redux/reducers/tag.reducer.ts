import {
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS,
    GET_TAGS_BY_USERID_REQUEST, GET_TAGS_BY_USERID_SUCCESS,
    CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS,
    UPDATE_TAG_REQUEST, UPDATE_TAG_SUCCESS,
    DELETE_TAG_REQUEST, DELETE_TAG_SUCCESS,
    ADD_TAG_TO_NOTE_REQUEST, ADD_TAG_TO_NOTE_SUCCESS,
    REMOVE_TAG_FROM_NOTE_REQUEST, REMOVE_TAG_FROM_NOTE_SUCCESS,
    CLEAR_TAGS_ERROR, GET_TAGS_BY_NOTEID_REQUEST, GET_TAGS_BY_NOTEID_SUCCESS,
} from '../../common/utils/constants/tag.constants';

const INITIAL_STATE = {
    tags: [],
    noteTags: [],
    loading: false,
    error: '',
};

const tagsReducer = (state = INITIAL_STATE, action: any) => {
    console.log('action', action);
    switch (action.type) {
        case GET_TAGS_REQUEST:
        case GET_TAGS_BY_USERID_REQUEST:
        case CREATE_TAG_REQUEST:
        case UPDATE_TAG_REQUEST:
        case DELETE_TAG_REQUEST:
        case ADD_TAG_TO_NOTE_REQUEST:
        case REMOVE_TAG_FROM_NOTE_REQUEST:
        case GET_TAGS_BY_NOTEID_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_TAGS_SUCCESS:
        case GET_TAGS_BY_USERID_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: action.payload,
            };

        case CREATE_TAG_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: [...state.tags, action.payload],
            }
        case UPDATE_TAG_SUCCESS:
        case DELETE_TAG_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: state.tags.filter((tag: any) => tag.tag_id != action.payload),
            }
        case ADD_TAG_TO_NOTE_SUCCESS:
        case REMOVE_TAG_FROM_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case CLEAR_TAGS_ERROR:
            return {
                ...state,
                error: '',
            };
        case GET_TAGS_BY_NOTEID_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: action.payload,
            };
        default:
            return state;
    }
};

export default tagsReducer;

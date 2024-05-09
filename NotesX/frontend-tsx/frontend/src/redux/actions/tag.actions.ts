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


export const tagsActionCreator = {
    getTagsRequest: () => ({
        type: GET_TAGS_REQUEST,
    }),

    getTagsSuccess: (tags: any) => ({
        type: GET_TAGS_SUCCESS,
        payload: tags,
    }),

    getTagsByUserIdRequest: (userId: string) => ({
        type: GET_TAGS_BY_USERID_REQUEST,
        payload: userId,
    }),

    getTagsByUserIdSuccess: (tags: any) => ({
        type: GET_TAGS_BY_USERID_SUCCESS,
        payload: tags,
    }),

    createTagRequest: (tagData: any) => ({
        type: CREATE_TAG_REQUEST,
        payload: tagData,
    }),

    createTagSuccess: () => ({
        type: CREATE_TAG_SUCCESS,
    }),

    updateTagRequest: (tagData: any) => ({
        type: UPDATE_TAG_REQUEST,
        payload: tagData,
    }),

    updateTagSuccess: () => ({
        type: UPDATE_TAG_SUCCESS,
    }),

    deleteTagRequest: (tagId: string) => ({
        type: DELETE_TAG_REQUEST,
        payload: tagId,
    }),

    deleteTagSuccess: () => ({
        type: DELETE_TAG_SUCCESS,
    }),

    addTagToNoteRequest: (tagData: any) => ({
        type: ADD_TAG_TO_NOTE_REQUEST,
        payload: tagData,
    }),

    addTagToNoteSuccess: () => ({
        type: ADD_TAG_TO_NOTE_SUCCESS,
    }),

    removeTagFromNoteRequest: (tagData: any) => ({
        type: REMOVE_TAG_FROM_NOTE_REQUEST,
        payload: tagData,
    }),

    removeTagFromNoteSuccess: () => ({
        type: REMOVE_TAG_FROM_NOTE_SUCCESS,
    }),

    getTagsByNoteIdRequest: (noteId: string) => ({
        type: GET_TAGS_BY_NOTEID_REQUEST,
        payload: noteId,
    }),

    getTagsByNoteIdSuccess: (tags: any) => ({
        type: GET_TAGS_BY_NOTEID_SUCCESS,
        payload: tags,
    }),

    clearTagsError: () => ({
        type: CLEAR_TAGS_ERROR,
    }),
};

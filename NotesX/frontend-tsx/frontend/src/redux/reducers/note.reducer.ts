import {
    CREATE_NOTE, CREATE_NOTE_SUCCESS, DELETE_NOTE, DELETE_NOTE_SUCCESS, GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_BY_USERID,
    GET_NOTES_BY_USERID_SUCCESS, UPDATE_NOTE, UPDATE_NOTE_SUCCESS, GET_ALL_COLLABORATORS, ADD_COLLABORATOR, REMOVE_COLLABORATOR,
    PIN_NOTE, UNPIN_NOTE, ARCHIVE_NOTE, UNARCHIVE_NOTE, TRASH_NOTE, UNTRASH_NOTE, ADD_REMINDER, REMOVE_REMINDER, GET_REMINDERS,
    GET_REMINDERS_SUCCESS, UNTRASH_NOTE_SUCCESS, TRASH_NOTE_SUCCESS, UNARCHIVE_NOTE_SUCCESS, ARCHIVE_NOTE_SUCCESS, UNPIN_NOTE_SUCCESS,
    REMOVE_COLLABORATOR_SUCCESS, ADD_COLLABORATOR_SUCCESS, GET_ALL_COLLABORATORS_SUCCESS, PIN_NOTE_SUCCESS, ADD_REMINDER_SUCCESS,
    REMOVE_REMINDER_SUCCESS, ADD_TAG_TO_NOTE, REMOVE_TAG_FROM_NOTE, ADD_TAG_TO_NOTE_SUCCESS, REMOVE_TAG_FROM_NOTE_SUCCESS
} from '../../common/utils/constants/note.constants';


interface NoteState {
    notes: INote[];
    loading: boolean;
    error: string | null;
}

const initialState: NoteState = {
    notes: [],
    loading: false,
    error: null,
};

function noteReducer(state: NoteState = initialState, action: any): NoteState {
    switch (action.type) {
        case CREATE_NOTE:
        case UPDATE_NOTE:
        case DELETE_NOTE:
        case GET_NOTES:
        case GET_NOTES_BY_USERID:
        case GET_ALL_COLLABORATORS:
        case ADD_COLLABORATOR:
        case REMOVE_COLLABORATOR:
        case PIN_NOTE:
        case UNPIN_NOTE:
        case ARCHIVE_NOTE:
        case UNARCHIVE_NOTE:
        case TRASH_NOTE:
        case UNTRASH_NOTE:
        case ADD_REMINDER:
        case REMOVE_REMINDER:
        case GET_REMINDERS:
        case ADD_TAG_TO_NOTE:
        case REMOVE_TAG_FROM_NOTE:
            return { ...state, loading: true };
        case CREATE_NOTE_SUCCESS:
            return { ...state, loading: false, notes: [...state.notes, action.payload.note] };

        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id === action.payload.note.note_id ? action.payload.note : note)
            };
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.filter(note => note.note_id !== action.payload.noteId)
            };
        case GET_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.payload
            };
        case GET_NOTES_BY_USERID_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.payload.notes
            };
        case GET_ALL_COLLABORATORS_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.payload
            };
        case ADD_COLLABORATOR_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case REMOVE_COLLABORATOR_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id === action.payload.collaborator.noteId ? { ...note, Note_Collaborators: note.Note_Collaborators.filter((c: any) => c.User.email !== action.payload.collaborator.email) } : note)
            };
        case PIN_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case UNPIN_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case ARCHIVE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case UNARCHIVE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case TRASH_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case UNTRASH_NOTE_SUCCESS:

            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };

        case ADD_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case REMOVE_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case GET_REMINDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                // notes: action.payload
            };
        case ADD_TAG_TO_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                // notes: state.notes.map(note => note.note_id == action.payload.note.note_id ? action.payload.note : note)
            };
        case REMOVE_TAG_FROM_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => {
                    if (note.note_id === action.payload.noteId) {
                        return {
                            ...note,
                            Note_Tags: note.Note_Tags.filter((t: any) => t.tag_id !== action.payload.tagId)
                        };
                    }
                    return note;
                })
            };

        default:
            return state;
    }
}

export default noteReducer;
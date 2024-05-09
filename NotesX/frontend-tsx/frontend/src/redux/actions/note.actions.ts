import {
    CREATE_NOTE, CREATE_NOTE_SUCCESS, DELETE_NOTE, DELETE_NOTE_SUCCESS, GET_NOTES, GET_NOTES_SUCCESS,
    GET_NOTES_BY_USERID, GET_NOTES_BY_USERID_SUCCESS, UPDATE_NOTE, UPDATE_NOTE_SUCCESS, GET_ALL_COLLABORATORS,
    GET_ALL_COLLABORATORS_SUCCESS, ADD_COLLABORATOR, ADD_COLLABORATOR_SUCCESS, REMOVE_COLLABORATOR,
    REMOVE_COLLABORATOR_SUCCESS, PIN_NOTE, PIN_NOTE_SUCCESS, UNPIN_NOTE, UNPIN_NOTE_SUCCESS, ARCHIVE_NOTE,
    ARCHIVE_NOTE_SUCCESS, UNARCHIVE_NOTE, UNARCHIVE_NOTE_SUCCESS, TRASH_NOTE, TRASH_NOTE_SUCCESS, UNTRASH_NOTE,
    UNTRASH_NOTE_SUCCESS, GET_REMINDERS, GET_REMINDERS_SUCCESS, ADD_REMINDER, ADD_REMINDER_SUCCESS, REMOVE_REMINDER,
    REMOVE_REMINDER_SUCCESS, ADD_TAG_TO_NOTE, REMOVE_TAG_FROM_NOTE, ADD_TAG_TO_NOTE_SUCCESS, REMOVE_TAG_FROM_NOTE_SUCCESS
} from '../../common/utils/constants/note.constants';


export const getNotes = () => ({
    type: GET_NOTES,
});

export const getNotesSuccess = (notes: any) => ({
    type: GET_NOTES_SUCCESS,
    payload: notes,
});

export const getNotesByUserId = (userId: string) => ({
    type: GET_NOTES_BY_USERID,
    payload: userId,
});

export const getNotesByUserIdSuccess = (notes: any) => ({
    type: GET_NOTES_BY_USERID_SUCCESS,
    payload: notes,
});

export const createNote = (note: any) => ({
    type: CREATE_NOTE,
    payload: note,
});

export const createNoteSuccess = (note: any) => ({
    type: CREATE_NOTE_SUCCESS,
    payload: note,
});

export const updateNote = (note: any) => ({
    type: UPDATE_NOTE,
    payload: note,
});

export const updateNoteSuccess = (note: any) => ({
    type: UPDATE_NOTE_SUCCESS,
    payload: note,
});


export const deleteNote = (noteId: string) => ({
    type: DELETE_NOTE,
    payload: noteId,
});

export const deleteNoteSuccess = (noteId: string) => ({
    type: DELETE_NOTE_SUCCESS,
    payload: noteId,
});

export const getAllCollaborators = () => ({
    type: GET_ALL_COLLABORATORS,
});

export const getAllCollaboratorsSuccess = (collaborators: any) => ({
    type: GET_ALL_COLLABORATORS_SUCCESS,
    payload: collaborators,
});

export const addCollaborator = (info: any) => ({
    type: ADD_COLLABORATOR,
    payload: info,
});

export const addCollaboratorSuccess = (info: any) => ({
    type: ADD_COLLABORATOR_SUCCESS,
    payload: info,
});

export const removeCollaborator = (info: any) => ({
    type: REMOVE_COLLABORATOR,
    payload: info,
});

export const removeCollaboratorSuccess = (info: any) => ({
    type: REMOVE_COLLABORATOR_SUCCESS,
    payload: info,
});

export const pinNote = (noteId: string) => ({
    type: PIN_NOTE,
    payload: noteId,
});

export const pinNoteSuccess = (note: any) => ({
    type: PIN_NOTE_SUCCESS,
    payload: note,
});

export const unpinNote = (noteId: string) => ({
    type: UNPIN_NOTE,
    payload: noteId,
});

export const unpinNoteSuccess = (note: any) => ({
    type: UNPIN_NOTE_SUCCESS,
    payload: note,
});


export const archiveNote = (noteId: string) => ({
    type: ARCHIVE_NOTE,
    payload: noteId,
});

export const archiveNoteSuccess = (note: any) => ({
    type: ARCHIVE_NOTE_SUCCESS,
    payload: note,
});


export const unarchiveNote = (noteId: string) => ({
    type: UNARCHIVE_NOTE,
    payload: noteId,
});

export const unarchiveNoteSuccess = (note: any) => ({
    type: UNARCHIVE_NOTE_SUCCESS,
    payload: note,
});

export const trashNote = (noteId: string) => ({
    type: TRASH_NOTE,
    payload: noteId,
});

export const trashNoteSuccess = (note: any) => ({
    type: TRASH_NOTE_SUCCESS,
    payload: note,
});


export const untrashNote = (noteId: string) => ({
    type: UNTRASH_NOTE,
    payload: noteId,
});

export const untrashNoteSuccess = (note: any) => ({
    type: UNTRASH_NOTE_SUCCESS,
    payload: note,
});

export const getReminders = () => ({
    type: GET_REMINDERS,
});

export const getRemindersSuccess = (notes: any) => ({
    type: GET_REMINDERS_SUCCESS,
    payload: notes,
});


export const addReminder = (info: any) => ({
    type: ADD_REMINDER,
    payload: info,
});


export const addReminderSuccess = (info: any) => ({
    type: ADD_REMINDER_SUCCESS,
    payload: info,
});

export const removeReminder = (info: any) => ({
    type: REMOVE_REMINDER,
    payload: info,
});

export const removeReminderSuccess = (info: any) => ({
    type: REMOVE_REMINDER_SUCCESS,
    payload: info,
});

export const addTagToNote = (info: any) => ({
    type: ADD_TAG_TO_NOTE,
    payload: info,
});

export const addTagToNoteSuccess = (info: any) => ({
    type: ADD_TAG_TO_NOTE_SUCCESS,
    payload: info,
});

export const removeTagFromNote = (info: any) => ({
    type: REMOVE_TAG_FROM_NOTE,
    payload: info,
});

export const removeTagFromNoteSuccess = (info: any) => ({
    type: REMOVE_TAG_FROM_NOTE_SUCCESS,
    payload: info,
});







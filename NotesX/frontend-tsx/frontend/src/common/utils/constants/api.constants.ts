export const AUTH_BASE_API = '/auth';
export const NOTE_BASE_API = '/note';
export const NOTIFICATION_BASE_API = '/notification';
export const TAG_BASE_API = '/tag';
export const USER_BASE_API = '/user';




// AUTH API

export const LOGIN_API = `${AUTH_BASE_API}/login`;
export const SIGNUP_API = `${AUTH_BASE_API}/signup`;
export const LOGOUT_API = `${AUTH_BASE_API}/logout`;
export const VERIFY_EMAIL_API = `${AUTH_BASE_API}/verifyEmail`;
export const VERIFY_OTP_API = `${AUTH_BASE_API}/verifyOtp`;




// NOTE API


// Note routes
export const CREATE_NOTE_API = `${NOTE_BASE_API}/`;
export const GET_NOTES_API = `${NOTE_BASE_API}/`;
export const GET_NOTES_BY_USERID_API = `${NOTE_BASE_API}/`;
export const UPDATE_NOTE_API = `${NOTE_BASE_API}/update`;
export const DELETE_NOTE_API = `${NOTE_BASE_API}/`;

// Collaborator routes
export const GET_ALL_COLLABORATORS_API = `${NOTE_BASE_API}/getCollaborators/`;
export const ADD_COLLABORATOR_API = `${NOTE_BASE_API}/addCollaborator`;
export const REMOVE_COLLABORATOR_API = `${NOTE_BASE_API}/removeCollaborator`;

// Pin/Unpin routes
export const PIN_NOTE_API = `${NOTE_BASE_API}/pin/`;
export const UNPIN_NOTE_API = `${NOTE_BASE_API}/unpin/`;

// Archive/Unarchive routes
export const ARCHIVE_NOTE_API = `${NOTE_BASE_API}/archive/`;
export const UNARCHIVE_NOTE_API = `${NOTE_BASE_API}/unarchive/`;

// Trash/Untrash routes
export const TRASH_NOTE_API = `${NOTE_BASE_API}/trash/`;
export const UNTRASH_NOTE_API = `${NOTE_BASE_API}/untrash/`;

// Get specific note collections
export const GET_ARCHIVED_NOTES_API = `${NOTE_BASE_API}/getArchived/`;
export const GET_TRASHED_NOTES_API = `${NOTE_BASE_API}/getTrashed/`;
export const GET_PINNED_NOTES_API = `${NOTE_BASE_API}/getPinned/`;
export const GET_COLLABORATED_NOTES_API = `${NOTE_BASE_API}/getCollaboratedNotes/`;

// Reminder routes
export const ADD_REMINDER_API = `${NOTE_BASE_API}/addReminder`;
export const REMOVE_REMINDER_API = `${NOTE_BASE_API}/removeReminder/`;
export const GET_REMINDERS_API = `${NOTE_BASE_API}/getReminders/`;

// Note version history
export const GET_NOTE_VERSION_HISTORY_API = `${NOTE_BASE_API}/getNoteVersionHistory/`;

// Upcoming reminders
export const GET_UPCOMING_REMINDERS_API = `${NOTE_BASE_API}/upcomingReminders/all`;




// Notification API

export const GET_NOTIFICATIONS_API = `${NOTIFICATION_BASE_API}/`;
export const CREATE_NOTIFICATION_API = `${NOTIFICATION_BASE_API}/create`;
export const DELETE_NOTIFICATION_API = `${NOTIFICATION_BASE_API}/`;
export const MARK_AS_READ_API = `${NOTIFICATION_BASE_API}/`;



// Tag API

export const GET_TAGS_API = `${TAG_BASE_API}`;
export const GET_TAGS_BY_USERID_API = `${TAG_BASE_API}/`;
export const CREATE_TAG_API = `${TAG_BASE_API}`;
export const UPDATE_TAG_API = `${TAG_BASE_API}/update`;
export const DELETE_TAG_API = `${TAG_BASE_API}/delete/`;
export const ADD_TAG_TO_NOTE_API = `${TAG_BASE_API}/addTagToNote`;
export const REMOVE_TAG_FROM_NOTE_API = `${TAG_BASE_API}/removeTagFromNote`;



// User routes

export const GET_USERS_API = `${USER_BASE_API}`;
export const GET_USER_BY_ID_API = `${USER_BASE_API}/`;
export const CREATE_USER_API = `${USER_BASE_API}`;
export const UPDATE_USER_API = `${USER_BASE_API}/update`;
export const DELETE_USER_API = `${USER_BASE_API}/`;








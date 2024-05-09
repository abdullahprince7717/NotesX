export declare global {
    export interface INote {

        note_id: string,
        note_title: string,
        note_description: string,
        note_image: string,
        is_pinned: boolean,
        is_archived: boolean,
        is_trashed: boolean,
        reminder: string,
        reminder_status: boolean,
        user_id: string,
        Note_Tags: string[],
        Note_Collaborators: string[],
        Note_Version_Histories: string[],
    }

    export interface INoteState {
        userId: string,
        noteTitle: string,
        noteDescription: string,
        noteImage: string,
        isPinned: boolean,
        isArchived: boolean,
        isTrashed: boolean,
        reminder: string,
        reminderStatus: boolean,
        noteTags: string[],
        noteCollaborators: string[],
    }

    export interface ILoginProps {
        location?: { state?: string };
    }

    export interface IInputFieldProps {
        name: string;
        control: any;
        defaultValue?: string;
        placeholder: string;
        type?: string;
        rules?: any;
        errors?: any;
        className?: string;
        disabled?: boolean;
        value?: string;
    }

    export interface ICollaboratorInfo {
        ownerId: string,
        email: string,
        noteId: string,
    }

    // export Interface INavbarProps {

    // }

}
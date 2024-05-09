import { useEffect, useState } from 'react';
import { HiOutlineUserAdd } from "react-icons/hi";
import { LuCalendarClock, LuClock, LuTrash2, LuArchiveRestore } from "react-icons/lu";
import { MdOutlineArchive, MdEdit, MdOutlineClose, MdOutlineAddPhotoAlternate, MdOutlineRestoreFromTrash, MdOutlineNewLabel } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from '../../ui/elements/dropdown.element';
import Modal from '../../ui/elements/modal.element';
import UploadImage from './uploadImage.component';
import * as NoteActionCreator from '../../../redux/actions/note.actions';
import { tagsActionCreator } from '../../../redux/actions/tag.actions';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';


function NoteCard({ note, type, lastIndex, current, }: { note?: INote | null, type?: string, lastIndex?: number, current?: number }): JSX.Element {

    const { user } = useSelector((state: any) => state.auth.user.response);
    const [noteState, setNoteState] = useState(note ? note : {

        note_id: "",
        note_title: "",
        note_description: "",
        note_image: "",
        is_pinned: false,
        is_archived: false,
        is_trashed: false,
        reminder: "",
        reminder_status: false,
        user_id: "",
        Note_Tags: [],
        Note_Collaborators: [],
        Note_Version_Histories: []
    });

    const [newNote, setNewNote] = useState({
        userId: user.user_id,
        noteTitle: "",
        noteDescription: "",
        noteImage: "",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
        reminder: "",
        reminderStatus: false,
        noteTags: [],
        noteCollaborators: [],
        noteVersionHistories: []
    })

    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200'];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    const backgroundColor = getRandomColor();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelType, setModelType] = useState("");

    const [showImage, setShowImage] = useState(false);
    const menuItems = ["Version History", "Add Label"];


    const menuActionHandler = (action: string) => {
        switch (action) {
            case "Version History":
                console.log("Version History");
                break;
            case "addLabel":
                console.log("Add Label");
                break;
            default:
                break;
        }
    }

    const handleOpenModal = (type: string) => {
        setIsModalOpen(true);
        setModelType(type);
    };

    const handleNoteSave = () => {
        const { noteTags, noteCollaborators, noteVersionHistories, ...rest } = noteState;
        const note = rest
        dispatch(NoteActionCreator.updateNote({
            noteId: noteState.note_id,
            userId: user.user_id,
            noteTitle: noteState.note_title,
            noteDescription: noteState.note_description,
            noteImage: noteState.note_image,
            isPinned: noteState.is_pinned,
            isArchived: noteState.is_archived,
            isTrashed: noteState.is_trashed,
            reminder: noteState.reminder,
            reminderStatus: noteState.reminder_status,
        }));

    }

    const handleNoteCreate = () => {
        const { noteTags, noteCollaborators, noteVersionHistories, ...rest } = newNote;
        const note = rest
        dispatch(NoteActionCreator.createNote(note));
        setNewNote({
            userId: user.user_id,
            noteTitle: "",
            noteDescription: "",
            noteImage: "",
            isPinned: false,
            isArchived: false,
            isTrashed: false,
            reminder: "",
            reminderStatus: false,
            noteTags: [],
            noteCollaborators: [],
            noteVersionHistories: []
        })
    }

    const handleClose = () => {
        setShowImage(!showImage);
        setNoteState({ ...noteState, note_image: "" });
    }

    const handleTagDelete = (tagId: string) => {
        setNoteState({ ...noteState, Note_Tags: noteState.Note_Tags.filter((t: any) => t.tag_id !== tagId) })
        dispatch(NoteActionCreator.removeTagFromNote({
            noteId: noteState.note_id,
            tagId: tagId
        }));
    }

    const handleAddCollab = (collaboratorInfo: ICollaboratorInfo) => {
        dispatch(NoteActionCreator.addCollaborator(collaboratorInfo));
    }

    const handleCollabDelete = (collabId, collabEmail: string) => {
        setNoteState({ ...noteState, Note_Collaborators: noteState.Note_Collaborators.filter((c: any) => c.user_id !== collabId) })
        dispatch(NoteActionCreator.removeCollaborator({
            noteId: noteState.note_id,
            email: collabEmail,
            ownerId: user.user_id
        }));
    }

    const handleNoteTrash = () => {
        dispatch(NoteActionCreator.trashNote(noteState.note_id));
    }

    const handleNoteUnTrash = () => {
        dispatch(NoteActionCreator.untrashNote(noteState.note_id));
    }

    const handleArchiveClick = () => {
        dispatch(NoteActionCreator.archiveNote(noteState.note_id));
    }

    const handleUnArchiveClick = () => {
        dispatch(NoteActionCreator.unarchiveNote(noteState.note_id));
    }

    const handleNoteDelete = () => {
        dispatch(NoteActionCreator.deleteNote(noteState.note_id));
    }



    return (
        <div className={`relative w-full max-w-80 h-full max-h-[39rem] border p-3 my-2 md:mr-3 rounded-lg shadow-md`}>
            {type == "notesList" || type == "archive" ?
                <div className='relative'>
                    <div className='flex flex-col'>
                        {/* <img src={note?.note_image} className='max-w-full max-h-60 rounded-lg -z-20' /> */}
                        <img src={note?.note_image} className='max-w-full max-h-60 rounded-lg -z-20' />
                        <input value={note?.note_title} className='h-10 mt-2 text-md' disabled />
                        <textarea value={note?.note_description} className='h-10 text-sm' disabled />
                    </div>
                    <div className='flex flex-wrap my-2'>
                        {note?.reminder ?
                            <div className=' flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1 items-center'>
                                <LuClock className='text-sm mr-1' />
                                {note?.reminder}
                            </div>
                            : null
                        }
                        {note?.Note_Tags?.map((tag: any, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}
                                >
                                    {tag.Tag.tag_name}
                                </div>
                            );
                        })}
                    </div>
                    <div className='flex flex-wrap '>
                        {note?.Note_Collaborators?.map((collab: any, index) => {
                            const backgroundColor = getRandomColor();
                            return (
                                <div key={index}
                                    className={`w-28 flex justify-start items-center ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}>
                                    <img src={collab.image} className='w-5 h-5 rounded-full' />
                                    {collab.User.first_name + " " + collab.User.last_name}
                                </div>
                            );
                        })}
                    </div>
                    <div className='flex justify-between text-gray-700 mt-1'>
                        <HiOutlineUserAdd onClick={() => handleOpenModal("addCollaborator")} className='text-xl cursor-pointer' />
                        <LuCalendarClock onClick={() => handleOpenModal("addReminder")} className='text-xl cursor-pointer' />
                        {type == "archive" ? <LuArchiveRestore onClick={() => handleUnArchiveClick()} className='text-xl cursor-pointer' /> : <MdOutlineArchive onClick={() => handleArchiveClick()} className='text-xl cursor-pointer' />}
                        <MdEdit onClick={() => handleOpenModal("editNote")} className='text-xl cursor-pointer' />
                        <LuTrash2 onClick={() => handleNoteTrash()} className='text-xl cursor-pointer' />
                        <BsThreeDotsVertical onClick={() => { setShowDropdown(!showDropdown) }} className='text-xl cursor-pointer' />
                        <div className={`${!showDropdown ? 'hidden' : 'visible'} absolute right-0 z-20  ${lastIndex == current ? 'bottom-5' : "bottom-[-6pc]"} xl:bottom-[-6pc] `}>
                            <Dropdown menuActionHandler={menuActionHandler} menuItems={menuItems} />
                        </div>
                    </div>

                </div>
                :
                type === "create" ?
                    <div className='relative'>
                        <div className='flex flex-col'>
                            {showImage && <UploadImage noteImage={newNote.noteImage} noteState={newNote} setNoteState={setNewNote} type='create' />}
                            <input className='h-10 mt-2 text-sm outline-none'
                                value={newNote.noteTitle}
                                onChange={(e) => setNewNote({ ...newNote, noteTitle: e.target.value })}
                                placeholder='Title'
                            />
                            <textarea className={`outline-none ${newNote.noteDescription.length > 50 ? 'h-20' : 'h-10 '} ' mt-2 text-sm '`}
                                value={newNote.noteDescription}
                                onChange={(e) => setNewNote({ ...newNote, noteDescription: e.target.value })}
                                placeholder='Description'

                            />
                        </div>
                        <div className={`${noteState.reminder ? 'flex flex-wrap my-2' : 'hidden'}`}>
                            <div className=' flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1 items-center'>
                                <LuClock className='text-sm mr-1' />
                                {noteState.reminder}
                            </div>
                            {newNote?.noteTags?.map((tag: any, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`flex ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}
                                    >
                                        {tag.name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex flex-wrap w-28'>
                            {newNote?.noteCollaborators?.map((collab: any, index) => {
                                const backgroundColor = getRandomColor();
                                return (
                                    <div key={index}
                                        className={`w-full flex justify-between items-center ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}>
                                        {/* <img src={collab.image} className='w-5 h-5 rounded-full' /> */}
                                        {collab.User.first_name + " " + collab.User.last_name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex justify-between text-gray-700 mt-1'>
                            <HiOutlineUserAdd onClick={() => handleOpenModal("addCollaborator")} className='text-xl cursor-pointer' />
                            <LuCalendarClock onClick={() => handleOpenModal("addReminder")} className='text-xl cursor-pointer' />
                            <MdOutlineArchive className='text-xl cursor-pointer' />
                            {!showImage ? <MdOutlineAddPhotoAlternate onClick={() => setShowImage(!showImage)} className='text-xl cursor-pointer' /> : <MdOutlineClose onClick={handleClose} className='text-xl cursor-pointer' />}
                            <MdOutlineNewLabel onClick={() => handleOpenModal("addLabel")} className='text-xl cursor-pointer' />
                        </div>
                        {
                            newNote.noteTitle.length > 0 || newNote.noteDescription.length > 0 ?
                                <button onClick={() => handleNoteCreate()} type="submit" className="rounded-full bg-[#306BE9] w-full text-white font-bold text-sm mt-6 px-10 py-2">Create</button> : null
                        }

                    </div>
                    :
                    type == "trash" ?
                        <div className='relative'>
                            <div className='flex flex-col'>
                                <img src={note?.note_image} className='max-w-full max-h-60 rounded-lg -z-20' />
                                <input value={note?.note_title} className='h-10 mt-2 text-md' disabled />
                                <textarea value={note?.note_description} className='h-10 text-sm' disabled />
                            </div>
                            <div className='flex flex-wrap my-2'>
                                {
                                    note?.reminder ?
                                        <div className=' flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1 items-center'>
                                            <LuClock className='text-sm mr-1' />
                                            {note?.reminder}
                                        </div>
                                        : null
                                }
                                {note?.Note_Tags?.map((tag: any, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}
                                        >
                                            {tag.Tag.tag_name}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='flex flex-wrap '>
                                {note?.Note_Collaborators?.map((collab: any, index) => {
                                    const backgroundColor = getRandomColor();
                                    return (
                                        <div key={index}
                                            className={`w-28 flex justify-start items-center ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}>
                                            <img src={collab.image} className='w-5 h-5 rounded-full' />
                                            {collab.User.first_name + " " + collab.User.last_name}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='flex justify-start text-gray-700 mt-1'>
                                <LuTrash2 onClick={() => handleNoteDelete()} className='text-xl cursor-pointer' />
                                <MdOutlineRestoreFromTrash onClick={() => handleNoteUnTrash()} className='text-2xl cursor-pointer' />
                            </div>

                        </div>
                        :
                        type == "editNote" ?
                            <div className='relative'>
                                <div className='flex flex-col'>
                                    {/* <img src={noteState.image} className='max-w-full max-h-60 rounded-lg' /> */}
                                    <UploadImage noteImage={noteState.note_image} noteState={noteState} setNoteState={setNoteState} />
                                    <input className='h-10 mt-2 text-sm outline-none'
                                        value={noteState.note_title}
                                        onChange={(e) => setNoteState({ ...noteState, note_title: e.target.value })}
                                        placeholder='Title'
                                    />
                                    <input className='h-10 mt-2 text-sm outline-none'
                                        value={noteState.note_description}
                                        onChange={(e) => setNoteState({ ...noteState, note_description: e.target.value })}
                                        placeholder='Description'
                                    />
                                </div>
                                <div className='flex flex-wrap my-2'>
                                    {
                                        noteState.reminder ?
                                            <div className=' flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1 items-center'>
                                                <LuClock className='text-sm mr-1' />
                                                {noteState.reminder}
                                                <IoClose onClick={() => setNoteState({ ...noteState, reminder: "" })} className='text-sm ml-1' />
                                            </div>
                                            :
                                            null
                                    }
                                    {noteState?.Note_Tags?.map((tag: any, index) => {
                                        console.log("noteState@#$#@$#@$#@$@#$2", noteState)
                                        const backgroundColor = getRandomColor();
                                        return (
                                            <div
                                                key={index}
                                                className={`flex ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}
                                            >
                                                {tag.Tag.tag_name}
                                                <IoClose onClick={() => handleTagDelete(tag.tag_id)} className='text-sm ml-1' />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='flex flex-wrap w-28'>
                                    {noteState?.Note_Collaborators?.map((collab: any, index) => {
                                        return (
                                            <div key={index}
                                                className={`w-full flex justify-between items-center ${backgroundColor} text-xs p-1 px-2 rounded-lg m-1`}>
                                                {/* <img src={collab.image} className='w-5 h-5 rounded-full' /> */}
                                                {collab.User.first_name + " " + collab.User.last_name}
                                                <IoClose onClick={() => handleCollabDelete(collab.user_id, collab.User.email)} className='text-sm ml-1' />
                                            </div>
                                        );
                                    })}
                                </div>

                                <button onClick={() => handleNoteSave()} type="submit" className="rounded-full bg-[#306BE9] w-full text-white font-bold text-sm mt-6 px-10 py-2">Save</button>

                            </div>
                            : null
            }
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} note={note} type={modelType} />
        </div>
    )
}

export default NoteCard
/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { HiOutlineUserAdd } from "react-icons/hi";
import { LuCalendarClock, LuClock, LuTrash2 } from "react-icons/lu";
import { MdOutlineArchive, MdEdit, MdOutlineClose, MdOutlinePushPin, MdPushPin, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";


function NoteCard({ note, type }) {

    const [noteState, setNoteState] = useState(note ? note : {
        userId: "",
        title: "",
        description: "",
        image: "",
        tags: [],
        collaborators: [],
        reminder: "",
        isPinned: false,
        isArchived: false,
        isTrashed: false,

    });

    const imageRef = new useRef(null);


    return (
        <div className={`w-full max-w-80 h-full max-h-[39rem] border p-3 my-2 md:mr-3 rounded-lg`}>
            {type === "notesList" ?
                <div className='relative'>
                    <div className='flex flex-col'>
                        <img src={note?.image} className='max-w-full max-h-60 rounded-lg' />
                        <b className='h-10 mt-2 text-md'>{note.title}</b>
                        <p className='h-10 text-sm'>{note.description}</p>
                    </div>
                    <div className='flex flex-wrap my-2'>
                        <div className=' flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1 items-center'>
                            <LuClock className='text-sm mr-1' />
                            {note.reminder}
                        </div>
                        {note?.tags?.map((tag, index) => (
                            <div key={index} className='flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1'>
                                {tag}
                                <MdOutlineClose className='text-sm' />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-wrap w-28'>
                        {note?.collaborators?.map((collab, index) => (
                            <div key={index} className='w-full flex justify-between items-center bg-blue-200 text-xs p-1 px-2 rounded-lg m-1'>
                                <img src={collab.image} className='w-5 h-5 rounded-full' />
                                {collab.name}
                                <MdOutlineClose className='text-sm' />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between text-gray-700'>
                        <HiOutlineUserAdd className='text-xl cursor-pointer' />
                        <LuCalendarClock className='text-xl cursor-pointer' />
                        <MdOutlineArchive className='text-xl cursor-pointer' />
                        <MdEdit className='text-xl cursor-pointer' />
                        <LuTrash2 className='text-xl cursor-pointer' />
                        <BsThreeDotsVertical className='text-xl cursor-pointer' />
                    </div>
                    <div className='absolute top-0 right-0'>
                        <MdOutlinePushPin className='text-xl cursor-pointer' />
                    </div>
                </div> : type === "create" ?
                    <div className='relative'>
                        <div className='flex flex-col'>
                            <img src={noteState.image} className='max-w-full max-h-60 rounded-lg' />
                            <input className='h-10 mt-2 text-sm outline-none'
                                value={noteState.title}
                                onChange={(e) => setNoteState({ ...noteState, title: e.target.value })}
                                placeholder='Title'
                            />
                            <input className='h-10 mt-2 text-sm outline-none'
                                value={noteState.description}
                                onChange={(e) => setNoteState({ ...noteState, description: e.target.value })}
                                placeholder='Description'
                            />
                        </div>
                        <div className={`${noteState.reminder ? 'flex flex-wrap my-2' : 'hidden'}`}>
                            <div className=' flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1 items-center'>
                                <LuClock className='text-sm mr-1' />
                                {noteState.reminder}
                            </div>
                            {noteState?.tags?.map((tag, index) => (
                                <div key={index} className='flex bg-blue-200 text-xs p-1 px-2 rounded-lg m-1'>
                                    {tag}
                                    <MdOutlineClose className='text-sm' />
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-wrap w-28'>
                            {noteState?.collaborators?.map((collab, index) => (
                                <div key={index} className='w-full flex justify-between items-center bg-blue-200 text-xs p-1 px-2 rounded-lg m-1'>
                                    <img src={collab.image} className='w-5 h-5 rounded-full' />
                                    {collab.name}
                                    <MdOutlineClose className='text-sm' />
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between text-gray-700 mt-1'>
                            <HiOutlineUserAdd className='text-xl cursor-pointer' />
                            <LuCalendarClock className='text-xl cursor-pointer' />
                            <MdOutlineArchive className='text-xl cursor-pointer' />
                            <MdOutlineAddPhotoAlternate className='text-xl cursor-pointer' />
                            <BsThreeDotsVertical className='text-xl cursor-pointer' />
                        </div>

                        <div onClick={() => setNoteState({ ...noteState, isPinned: !noteState.isPinned })} className='absolute top-0 right-0'>
                            {noteState.isPinned ?
                                <MdOutlinePushPin className='text-xl cursor-pointer' />
                                :
                                <MdPushPin className='text-xl cursor-pointer' />
                            }

                        </div>
                    </div> : null
            }
        </div>
    )
}

export default NoteCard
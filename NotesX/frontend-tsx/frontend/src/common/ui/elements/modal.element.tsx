import React, { useState } from 'react';
import NoteCard from '../../components/client/NoteCard.component';
import { MdClose } from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    note?: INote | null;
    type?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, note, type }) => {

    const [collabEmail, setCollabEmail] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" >
            {
                type == "editNote" ? (
                    <>
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                            <div className="relative bg-white p-6 rounded-lg shadow-md">
                                <NoteCard note={note} type={type} />
                                <MdClose onClick={onClose} className="absolute top-2 right-2" />
                            </div>
                        </div>
                    </>
                ) : type == 'addCollaborator' ? (
                    <>
                        <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
                            <div className="relative bg-white rounded-lg shadow-md">
                                <div className='p-6'>
                                    <b>Collaborators</b>
                                    <div className='flex'>
                                        <div>
                                            <input
                                                value={collabEmail}
                                                onChange={(e) => setCollabEmail(e.target.value)}
                                                className='outline-none w-60 md:w-66 lg:w-72 xl:w-80 p-2' type="text" placeholder="Enter Email" />
                                            <button >Add</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-end p-2 px-7 bg-gray-400'>
                                    <button className='border border-black p-1 rounded-lg'>Save</button>
                                </div>
                                <MdClose onClick={onClose} className="absolute top-2 right-2" />
                            </div>
                        </div>
                    </>
                ) : type == 'addLabel' ?

                    (
                        <>
                            <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
                                <div className="relative bg-white rounded-lg shadow-md">
                                    <div className='p-6'>
                                        <b>Labels</b>
                                        <div className='flex'>
                                            <div>
                                                <input className='outline-none w-60 md:w-66 lg:w-72 xl:w-80 p-2' type="text" placeholder="Enter Label" />
                                                <button >Add</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='flex justify-end p-2 px-7 bg-gray-400'>
                                        <button className='border border-black p-1 rounded-lg'>Save</button>
                                    </div>
                                    <MdClose onClick={onClose} className="absolute top-2 right-2" />
                                </div>
                            </div>
                        </>
                    )

                    : type == 'addReminder' ?
                        (
                            <>
                                <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
                                    <div className="relative bg-white p-6 rounded-lg shadow-md">
                                        <b>Set Reminder</b>
                                        <div className='flex'>
                                            <div>
                                                <input className='outline-none w-60 md:w-66 lg:w-72 xl:w-80' type="datetime-local" placeholder="Enter email" />

                                            </div>
                                        </div>
                                        <MdClose onClick={onClose} className="absolute top-2 right-2" />
                                    </div>
                                </div>
                            </>
                        ) : null
            }

        </div>
    );
};

export default Modal;

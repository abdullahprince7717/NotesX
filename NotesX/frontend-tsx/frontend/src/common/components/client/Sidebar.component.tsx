import { useState } from 'react';
import { MdLightbulbOutline, MdLabelOutline, MdEdit, MdOutlineArchive, MdNotificationsNone } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { LuCalendarClock, LuUser } from "react-icons/lu";
import { SIDEBAR_MENU_ITEMS } from "../../utils/constants/constants";



function Sidebar({ showMenu, setShowMenu, setMenuItem }: { showMenu: boolean, setShowMenu: any, setMenuItem: any }): JSX.Element {

    const [focusedIcon, setFocusedIcon] = useState(1);
    const [focusedIndex, setFocusedIndex] = useState(1);

    const handleFocus = (index: number) => {
        setFocusedIcon(index);
        setFocusedIndex(index);
        setMenuItem(SIDEBAR_MENU_ITEMS[index]);
    };

    return (
        <div className={` fixed bg-white z-10 ${!showMenu ? 'shadow-md' : ''}`} >
            <div className="flex h-full flex-col w-12 md:w-16">
                <div className='flex flex-col items-center justify-start py-1 text-slate-500 space-y-2'>
                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <MdNotificationsNone
                            tabIndex={0}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 0 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(0)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>
                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <MdLightbulbOutline
                            tabIndex={1}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 1 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(1)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>
                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <LuCalendarClock
                            tabIndex={12}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 6 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(6)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>
                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <MdLabelOutline
                            tabIndex={2}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 2 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(2)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>

                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <MdEdit
                            tabIndex={3}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 3 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(3)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>

                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <MdOutlineArchive
                            tabIndex={4}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 4 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(4)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>

                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <IoTrashOutline
                            tabIndex={5}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 5 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(5)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>

                    <div className={` ${showMenu ? 'hidden' : 'w-12'}`}>
                        <LuUser
                            tabIndex={6}
                            className={`text-4xl p-2 hover:bg-slate-200 cursor-pointer rounded-full ${focusedIcon === 7 ? 'bg-blue-200' : ''}`}
                            onFocus={() => {
                                handleFocus(7)
                            }}
                            onClick={() => setShowMenu(true)}
                        />
                    </div>
                </div>


                <div className={` flex flex-col items-center  justify-start py-2 shadow-md h-full text-slate-500 ${showMenu ? 'w-48 md:w-64 lg:w-80 z-10 bg-white' : 'hidden'}`}>
                    <div
                        className={`w-full grid grid-cols-2 place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 0 ? 'bg-blue-200' : ''}`}
                        tabIndex={6}
                        onFocus={() => {
                            handleFocus(0)
                        }}
                    >
                        <MdNotificationsNone className='text-4xl p-2 rounded-full' />
                        <p >Notifications</p>
                    </div>
                    <div
                        className={`w-full grid grid-cols-2  place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 1 ? 'bg-blue-200' : ''}`}
                        tabIndex={7}
                        onFocus={() => {
                            handleFocus(1)
                        }}
                    >
                        <MdLightbulbOutline className='text-4xl p-2 rounded-full' />
                        <p >Notes</p>
                    </div>
                    <div
                        className={`w-full grid grid-cols-2  place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 6 ? 'bg-blue-200' : ''}`}
                        tabIndex={13}
                        onFocus={() => {
                            handleFocus(6)
                        }}
                    >
                        <LuCalendarClock className='text-4xl p-2 rounded-full' />
                        <p >Reminders</p>
                    </div>
                    <div
                        className={`w-full grid grid-cols-2 place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 2 ? 'bg-blue-200' : ''}`}
                        tabIndex={8}
                        onFocus={() => {
                            handleFocus(2)
                        }}
                    >
                        <MdLabelOutline className='text-4xl p-2 rounded-full' />
                        <p>Labels</p>
                    </div>

                    <div
                        className={`w-full grid grid-cols-2 place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 3 ? 'bg-blue-200' : ''}`}
                        tabIndex={9}
                        onFocus={() => {
                            handleFocus(3)
                        }}
                    >
                        <MdEdit className='text-4xl p-2 rounded-full' />
                        <p>Edit Label</p>
                    </div>

                    <div
                        className={`w-full grid grid-cols-2 place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 4 ? 'bg-blue-200' : ''}`}
                        tabIndex={10}
                        onFocus={() => {
                            handleFocus(4)
                        }}
                    >
                        <MdOutlineArchive className='text-4xl p-2 rounded-full' />
                        <p>Archives</p>
                    </div>

                    <div
                        className={`w-full grid grid-cols-2 place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 5 ? 'bg-blue-200' : ''}`}
                        tabIndex={11}
                        onFocus={() => {
                            handleFocus(5)
                        }}
                    >
                        <IoTrashOutline className=' text-4xl p-2 rounded-full' />
                        <p >Trash</p>
                    </div>
                    <div
                        className={`w-full grid grid-cols-2 place-items-center p-1 hover:bg-slate-200 cursor-pointer pr-5 rounded-full ${focusedIndex === 7 ? 'bg-blue-200' : ''}`}
                        tabIndex={14}
                        onFocus={() => {
                            handleFocus(7)
                        }}
                    >
                        <LuUser className='text-4xl p-2 rounded-full' />
                        <p >Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

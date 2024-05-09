/* eslint-disable @typescript-eslint/no-unused-vars */
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSearch, MdOutlineSettings, MdClose, MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import img1 from "../../assets/always-chromebook.jpg"
import Dropdown from "../../ui/elements/dropdown.element";
import { SOCKET_URL, SETTINGS_MENU_ITEMS } from "../../utils/constants/constants";
import { useDispatch } from "react-redux";
import { authActionCreator } from '../../../redux/actions/auth.actions';


function Navbar({ handleMenu, menuItem }: { handleMenu: () => void, menuItem: string }): JSX.Element {

    const [showSearch, setShowSearch] = useState(false);
    // const [search, setSearch] = useState<string>('');
    // const socket = io(SOCKET_URL);
    const dispatch = useDispatch();

    const [showSettings, setShowSettings] = useState(false)
    const menuActionHandler = (action: string) => {
        if (action == 'Logout') {
            dispatch(authActionCreator.logoutSuccess());
        }
    }

    // useEffect(() => {
    //     console.log('socket', socket);

    //     socket.on('connect', () => {
    //         console.log('connected');
    //     });

    //     socket.on('get', (data) => {
    //         console.log('data', data);
    //     });

    // }, [socket]);

    return (
        <div className='fixed w-full flex justify-between items-center text-white bg-blue-500 p-4 py-2 z-50'>
            <div className={`flex items-center text-xl font-bold cursor-pointer space-x-4 ${showSearch ? "hidden" : ''}`} >
                <GiHamburgerMenu onClick={handleMenu} />
                {menuItem ? menuItem == 'Notes' ?
                    <p className="font-thin">Notes<b>X</b></p>
                    :
                    <p className="font-thin">{menuItem}</p>
                    :
                    <p className="font-thin">Notes<b>X</b></p>
                }
            </div>

            <div className={`relative ${showSearch ? '' : 'hidden'}`}>
                <input type="text" onChange={(e) => { setSearch(e.target.value) }} className="w-48 rounded-md outline-none text-black text-sm px-6 py-1 " />
                <MdClose onClick={() => setShowSearch(!showSearch)} className="absolute top-[6px] left-1 text-black " />
                <MdArrowForward className="absolute top-[6px] right-2 text-black" />
            </div>

            <div className="hidden md:!block md:flex-1 md:mx-5 ">
                <div className="relative flex w-2/3 ">
                    <input type="text" onChange={(e) => { setSearch(e.target.value) }} className="w-full rounded-md outline-none text-black text-sm px-6 py-1 " />
                    <MdOutlineSearch className="absolute top-[6px] left-1 text-black " />
                    <MdArrowForward className="absolute top-[6px] right-2 text-black" />
                </div>
            </div>

            <div className="relative">
                <div className="flex">
                    <MdOutlineSearch onClick={() => setShowSearch(!showSearch)} className="rounded-full p-1 text-2xl hover:bg-blue-400 cursor-pointer md:hidden" />
                    <MdOutlineSettings onClick={() => setShowSettings(!showSettings)} className="rounded-full p-1 text-2xl hover:bg-blue-400 cursor-pointer lg:text-3xl" />
                    {/* <img src={img1} className="w-4 h-4 m-1 rounded-full outline outline-2 outline-yellow-500 cursor-pointer lg:h-6 lg:w-6" /> */}
                </div>
                <div className={`${!showSettings ? 'hidden' : 'visible'} absolute right-7 text-black`}>
                    <Dropdown menuActionHandler={menuActionHandler} menuItems={SETTINGS_MENU_ITEMS} />
                </div>
            </div>
        </div>
    )
}

export default Navbar

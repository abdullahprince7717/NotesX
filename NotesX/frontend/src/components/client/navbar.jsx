/* eslint-disable react/prop-types */
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSearch, MdOutlineSettings, MdClose, MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import img1 from "../../assets/_sprites.png"


function Navbar({ handleMenu, menuItem }) {

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const socket = io('http://localhost:3000');

    useEffect(() => {
        console.log('socket', socket);

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('get', (data) => {
            console.log('data', data);
        });

    }, [socket]);

    return (
        <div className='flex justify-between items-center text-white bg-blue-500 p-4 py-2 z-50'>
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

            <div className="flex">
                <MdOutlineSearch onClick={() => setShowSearch(!showSearch)} className="rounded-full p-1 text-2xl hover:bg-blue-400 cursor-pointer md:hidden" />
                <MdOutlineSettings className="rounded-full p-1 text-2xl hover:bg-blue-400 cursor-pointer" />
                <img src={img1} className="max-w-4 max-h-4 m-1 rounded-full outline outline-2 outline-yellow-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default Navbar
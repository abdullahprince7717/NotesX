import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


function Navbar() {

    const [showMenu, setShowMenu] = useState(false)
    const [sock, setSock] = useState()

    const handleMenu = () => {
        setShowMenu(!showMenu)

    }

    function handleClick() {
        console.log('clicked')
        const socket = io('http://localhost:3000')
        socket.on('add', (data) => {
            console.log('data', data)
            setSock(data);
        })
    }



    useEffect(() => {
        handleClick()
    })

    return (
        <div className='flex justify-between items-center h-24 mx-auto px-4 lg:px-10 '>
            <h1 className='w-full text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#00df9a]'>React.</h1>
            <ul className='flex sm:flex md:text-xl lg:text-2xl 2xl:text-4xl'>
                <a className='p-4' href='#'>Home</a>
                <a className='p-4' href='#'>About</a>
                <a className='p-4' href='#'>Services</a>
                <a className='p-4' href='#'>Contact</a>
                <a className='p-4' href='#'>{sock}</a>
            </ul>
            <div onClick={handleMenu} className="sm:hidden">
                {showMenu ? <IoMdClose size={20} /> : <GiHamburgerMenu size={20} />}
            </div>
            <div className={showMenu ? "fixed top-0 w-[60%] h-full ease-in-out duration-500" : "hidden"}>

                <ul className="flex flex-col pt-24 uppercase">
                    <a className='p-4 border-b border-grey-500' href='#'>Home</a>
                    <a className='p-4 border-b border-grey-500' href='#'>About</a>
                    <a className='p-4 border-b border-grey-500' href='#'>Services</a>
                    <a className='p-4 border-b border-grey-500' href='#'>Contact</a>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
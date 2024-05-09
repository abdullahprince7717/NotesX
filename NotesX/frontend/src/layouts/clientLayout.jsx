import { useState, useEffect } from 'react'
import Navbar from '../components/client/Navbar'
import Sidebar from '../components/client/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'

function ClientLayout() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [menuItem, setMenuItem] = useState();

    const handleMenu = () => {
        console.log('clicked menu')
        setShowMenu(!showMenu)
        console.log('showMenu', showMenu)
    }

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login')
            return
        }
    })

    useEffect(() => {
        if (!menuItem) {
            setMenuItem('Notes')
        }
        navigate(`/user/${menuItem?.toLowerCase()}`)
    }, [menuItem])

    return (
        <div className='flex flex-col h-screen'>
            <Navbar handleMenu={handleMenu} menuItem={menuItem} />
            <div className='flex flex-1'>
                <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} setMenuItem={setMenuItem} />
                <div className='flex-grow p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ClientLayout
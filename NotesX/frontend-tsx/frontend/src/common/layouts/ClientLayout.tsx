import { useState, useEffect } from 'react'
import Navbar from '../components/client/Navbar.component'
import Sidebar from '../components/client/Sidebar.component'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

function ClientLayout() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [menuItem, setMenuItem] = useState<string>();
    const { isAuthenticated } = useSelector((state: any) => state.auth)
    const handleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        if (!isAuthenticated) {
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
            <Navbar handleMenu={handleMenu} menuItem={menuItem || ''} />
            <div className='flex flex-1 pt-10 '>
                <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} setMenuItem={setMenuItem} />
                <div className='flex-grow pl-16'>
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default ClientLayout
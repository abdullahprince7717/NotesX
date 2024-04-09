import { useEffect } from 'react'
import Navbar from '../components/client/navbar'
import { Outlet, useNavigate } from 'react-router-dom'

function clientLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login')
            return
        }
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default clientLayout
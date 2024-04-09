import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth({ children }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/user/home')
            return
        }
    }, [])

    return (
        <>
            {children}
        </>
    )

}

export default Auth
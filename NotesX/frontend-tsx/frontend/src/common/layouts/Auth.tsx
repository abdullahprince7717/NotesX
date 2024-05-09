import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Auth({ children }: any): JSX.Element {
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/user/notes')
            return
        }
    }, [isAuthenticated])

    return (
        <>
            {children}
        </>
    )

}

export default Auth
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

function Home() {
    const user = useSelector(state => state.user)
    const localUser = localStorage.getItem('user')
    const [userInfo, setUserInfo] = useState()
    const [userId, setUserId] = useState('')

    useEffect(() => {
        setUserInfo(user ? user : localUser ? JSON.parse(localUser) : {})
        console.log('userInfo', user)
    }, [])

    const handleAddCollaborator = async () => {
        try {
            const collaborator = await axios.post('http://localhost:3000/note/addCollaborator', {
                ownerId: "abc99808-4e4d-40fe-b782-0bc07bce627d",
                userId: "57372c8b-165e-4dd1-a6e3-220df92af4b9",
                noteId: "8b0c2bef-5ef8-425c-a5c1-648bf0e7f294"
            })
            console.log('collaborator', collaborator)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <div>
            <h1 className=" text-2xl">Add Collaborator</h1>
            <div>
                <input onChange={setUserId} type="text" className="p-5 text-lg border-2" placeholder="Enter Collaborator Id" />
                <button className="p-4 text-lg" onClick={handleAddCollaborator}>Add</button>
            </div>
        </div>
    )
}

export default Home
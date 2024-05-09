import { useState } from 'react'

function Home() {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')))

    return (
        <div>
            <h1>Home13</h1>
            <h2>Welcome {userInfo?.user_id}</h2>
        </div>
    )
}

export default Home
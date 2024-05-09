// src/components/Home.tsx
import { useState } from 'react';

interface UserInfo {
    user_id?: string; // Optional property to handle potential absence
}

function Home(): JSX.Element {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
    );

    try {
        if (!userInfo) {
            const user = localStorage.getItem('user');
            if (user) {
                setUserInfo(JSON.parse(user));
            }
        }
    } catch (error) {
        console.error('Error retrieving user info from localStorage:', error);
    }

    return (
        <div>
            <h1>Home13</h1>
            <h2>Welcome {userInfo?.user_id}</h2>
        </div>
    );
}

export default Home;

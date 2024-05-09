
function Notifications(): JSX.Element {

    const Notifications = [
        {
            id: 1,
            title: 'New User Registered',
            description: 'A new user has registered on the platform',
            date: '2021-10-10',
            time: '12:30'
        },
        {
            id: 2,
            title: 'New User Registered',
            description: 'A new user has registered on the platform',
            date: '2021-10-10',
            time: '12:30'
        },
        {
            id: 3,
            title: 'New User Registered',
            description: 'A new user has registered on the platform',
            date: '2021-10-10',
            time: '12:30'
        },
        {
            id: 4,
            title: 'New User Registered',
            description: 'A new user has registered on the platform',
            date: '2021-10-10',
            time: '12:30'
        },
        {
            id: 5,
            title: 'New User Registered',
            description: 'A new user has registered on the platform',
            date: '2021-10-10',
            time: '12:30'
        },
        {
            id: 6,
            title: 'New User Registered',
            description: 'A new user has registered on the platform',
            date: '2021-10-10',
            time: '12:30'
        },
    ]
    return (
        <div className='w-full h-full flex flex-col bg-gray-100 p-5'>
            <div className='flex justify-between'>
                <p className='text-xl font-bold'>Notifications</p>
                <button className='cursor-pointer underline text-blue-600'>Clear All</button>
            </div>
            <div className='flex flex-col bg-white mt-3'>
                {Notifications.map((notification, index) => (
                    <div key={index} className='flex flex-col p-4 border border-t-0 hover:bg-gray-50 cursor-pointer '>
                        <b>{notification.title}</b>
                        <p>{notification.description}</p>
                        <div className='flex justify-between'>
                            <p>{notification.date}</p>
                            <p>{notification.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notifications
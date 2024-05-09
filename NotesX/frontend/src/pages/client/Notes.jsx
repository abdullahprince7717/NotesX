import NoteCard from "../../components/client/NoteCard"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Notes() {

    const user = useSelector(state => state.user)

    useEffect(() => {
        console.log('user', user)
    })
    const notes = [
        {
            title: 'Note 1',
            description: 'Description 1',
            image: 'https://source.unsplash.com/random',
            reminder: '12-12-2022  07:12:12 PM',
            isPinned: false,
            isArchived: true,
            isTrashed: false,
        },
        {
            title: 'Note 2',
            description: 'Description',
            image: 'https://source.unsplash.com/random',
            tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
            collaborators: [
                {
                    name: 'collab1',
                    email: 'abc@yopmail.com',
                    image: 'https://source.unsplash.com/random'
                },
                {
                    name: 'collab2',
                    email: 'abc@yopmail.com',
                    image: 'https://source.unsplash.com/random'
                },
                {
                    name: 'collab1',
                    email: 'abc@yopmail.com',
                    image: 'https://source.unsplash.com/random'
                },
            ],
            reminder: '2022-12-12',
            isPinned: true,
            isArchived: false,
            isTrashed: false,
        },
        {
            title: 'Note 3',
            description: 'Description ....',
            image: 'https://source.unsplash.com/random',
            tags: ['tag1', 'tag2', 'tag3'],
            collaborators: [
                {
                    name: 'collab1',
                    email: 'abc@yopmail.com',
                    image: 'https://source.unsplash.com/random'
                },
                {
                    name: 'collab2',
                    email: 'abc@yopmail.com',
                    image: 'https://source.unsplash.com/random'
                }
            ],
            reminder: '2022-12-12',
            isPinned: true,
            isArchived: false,
            isTrashed: false,
        }
    ]
    return (
        <div className="w-full flex-col ">
            <NoteCard type={"create"} />
            <div className="w-full flex flex-col flex-wrap md:flex-row justify-start ">
                {notes.map((note, index) => (
                    <NoteCard key={index} note={note} type={"notesList"} />
                ))}

            </div>
        </div>
    )
}

export default Notes
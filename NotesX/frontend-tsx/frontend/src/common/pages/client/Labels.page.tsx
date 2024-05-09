import { useState } from "react"
import NoteCard from "../../components/client/NoteCard.component"
import { FaChevronDown } from "react-icons/fa";
import Dropdown from "../../ui/elements/dropdown.element";

function Labels() {

    const [showDropdown, setShowDropdown] = useState(false);

    const notes = [
        {
            userId: '1',
            title: 'Note 1',
            description: 'Description 1',
            image: 'https://source.unsplash.com/random',
            reminder: '12-12-2022  07:12:12 PM',
            isPinned: false,
            isArchived: true,
            isTrashed: false,
        },
        {
            userId: '1',
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
            userId: '1',
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

    const labels = [
        "Game",
        "Office",
        "wow",
        "shshsh"
    ]
    const menuActionHandler = (action: string) => {
        switch (action) {
            case "Game":
                console.log("Game");
                break;
            case "Office":
                console.log("Office");
                break;
            default:
                break;
        }
    }

    return (
        <div className="relative w-full p-5 ">
            <div className=" flex flex-col items-center mb-20">
                <b className="text-xl">Filter By Tags</b>
                <button onClick={() => { setShowDropdown(!showDropdown) }} className=" min-w-44 flex items-center justify-between border-2 p-2 px-4 shadow-md">
                    <p className="mr-2">Game</p>
                    <FaChevronDown />
                </button>
                <div className={`${!showDropdown ? 'hidden' : 'visible'} absolute top-24 z-10  `} >
                    <Dropdown menuActionHandler={menuActionHandler} menuItems={labels} />
                </div>
            </div>

            <div className="w-full flex flex-col flex-wrap sm:items-center md:items-start md:flex-row justify-start ">
                {notes.map((note, index) => (
                    <NoteCard key={index} note={note} type={"notesList"} />
                ))}

            </div>
        </div>
    )
}

export default Labels
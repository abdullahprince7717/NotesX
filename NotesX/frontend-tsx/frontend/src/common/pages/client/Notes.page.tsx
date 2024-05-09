import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotesByUserId } from "../../../redux/actions/note.actions";
import NoteCard from "../../components/client/NoteCard.component";
import { ColorRing } from 'react-loader-spinner';

function Notes() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth.user.response);
    const notes = useSelector((state: any) => state.note.notes);
    const isLoading = useSelector((state: any) => state.note.loading);

    const selectFilteredNotes = useMemo(() => {
        if (notes?.length > 0) {
            return notes?.filter((note: INote) => !note?.is_archived && !note?.is_trashed);
        } else {
            return [];
        }
    }, [notes]);

    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        dispatch(getNotesByUserId(user?.user_id));
    }, [dispatch, user]);

    useEffect(() => {
        setFilteredNotes(selectFilteredNotes);
        console.log('filteredNotes', selectFilteredNotes);
    }, [selectFilteredNotes]);

    return (
        <div className="w-full flex-col p-5">
            <div className="flex sm:justify-center">
                <NoteCard type={"create"} />
            </div>
            <div className="w-full flex flex-col flex-wrap sm:items-center md:items-start md:flex-row justify-start">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                ) : (
                    filteredNotes.length > 0 ?
                        filteredNotes.map((note, index) => (
                            <NoteCard
                                key={index}
                                current={index}
                                lastIndex={filteredNotes.length - 1}
                                note={note}
                                type={"notesList"}
                            />
                        ))
                        : (
                            <p>No notes found.</p>
                        )
                )}
            </div>
        </div>
    );
}

export default Notes;

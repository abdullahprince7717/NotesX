import { useState } from "react";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { tagsActionCreator } from "../../../redux/actions/tag.actions";

const LabelItem = (tag: any) => {


    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    const editHandler = (tagId: any) => {
        setEditMode(!editMode)
        console.log(tagId)
    }

    const deleteHandler = (tagId: any) => {
        dispatch(tagsActionCreator.deleteTagRequest(tagId))
    }
    return (
        <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md">
            <span>{tag.tag.tag_name}</span>
            <div className="flex items-center text-xl">
                {editMode ? <MdCheck onClick={() => setEditMode(!editMode)} /> : <MdEdit onClick={() => editHandler(tag.tag.tag_id)} className="mr-2" />}
                <MdDelete onClick={() => deleteHandler(tag.tag.tag_id)} />
            </div>
        </div>
    )

}

export default LabelItem;
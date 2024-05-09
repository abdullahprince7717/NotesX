import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { useDispatch } from "react-redux";
import { tagsActionCreator } from "../../../redux/actions/tag.actions";
import { useSelector } from "react-redux";
import InputField from "../../ui/elements/inputField.element";
import { useForm } from "react-hook-form";
import LabelItem from "../../components/client/labelItem.component";


export default function EditLabel() {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector((state: any) => state.auth.user.response)
    const tags = useSelector((state: any) => state.tag.tags)

    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch()

    const inputOptions = {
        label: { required: "Label is required", }
    }

    useEffect(() => {
        dispatch(tagsActionCreator.getTagsByUserIdRequest(user.user_id))
    }, [])


    const editHandler = (tagId: any) => {
        setEditMode(!editMode)
        console.log(tagId)
    }

    const deleteHandler = (tagId: any) => {
        dispatch(tagsActionCreator.deleteTagRequest(tagId))
    }

    const saveHandler = (data: any) => {
        dispatch(tagsActionCreator.createTagRequest({
            userId: user.user_id,
            tagName: data.label,
        }))
    }

    return (
        <div className="flex flex-col items-center p-5">
            <b className="text-xl">Add New Label</b>
            <div className=" mt-5">
                <form onSubmit={handleSubmit(saveHandler)}>
                    <InputField
                        name="label"
                        type="text"
                        control={control}
                        rules={inputOptions.label}
                        errors={errors}
                        placeholder="Create new label"
                        className="outline-none mb-3"
                    />
                    <button className="w-full p-1 bg-blue-500 text-white rounded-md">Save</button>

                </form>
            </div>

            {/* make separate component doe label item */}

            <div className="w-full flex flex-col items-center mt-5">
                <b className="text-xl">All Labels</b>
                {tags?.map((tag: any, index: any) => (
                    <div key={index} className="w-2/3 max-w-96 p-2">
                        <LabelItem key={index} tag={tag} />
                    </div>

                ))}
            </div>

        </div>
    )
}
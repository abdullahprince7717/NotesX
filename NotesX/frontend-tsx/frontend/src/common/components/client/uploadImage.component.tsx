import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidV4 } from "uuid";

const supabase = createClient(
    "https://wyznfebhhxjznnsaupgw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5em5mZWJoaHhqem5uc2F1cGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5OTM4ODUsImV4cCI6MjAzMDU2OTg4NX0.3DJs7Xcf0OLrQc-7DbglPFU_heAkJJEeFua4WL4xj30"
);

function UploadImage({ noteImage, noteState, setNoteState, type }: { noteImage?: string, noteState?: INote | INoteState | any, setNoteState?: (note: INote | INoteState | any) => void, type?: string }) {
    const [image, setImage] = useState(noteImage ? noteImage : null);
    const hiddenFileInput = useRef(null);
    return (
        <>
            <div className=" bg-gray-300  rounded-md cursor-pointer flex items-center justify-center">
                {!image ? (
                    <>
                        <p
                            className=" text-5xl p-10"
                            onClick={() => {
                                hiddenFileInput?.current?.click();
                            }}
                        >
                            +
                        </p>
                    </>
                ) : (
                    <>
                        <img
                            src={image}
                            className="max-w-64 max-h-40"
                            onClick={() => {
                                hiddenFileInput?.current?.click();
                            }}
                        />
                    </>
                )}

                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    ref={hiddenFileInput}
                    onChange={async (e) => {
                        const file = e?.target?.files?.[0];
                        if (file) {
                            setImage(URL.createObjectURL(file));
                        }
                        const { data: uploadData, error: uploadError } =
                            await supabase.storage
                                .from("note-images")
                                .upload("image" + uuidV4(), file);

                        if (uploadError) {
                            alert("unable to upload image ");
                            setImage(null);
                        }

                        console.log("upload image ", uploadData);
                        const { data: getData } = supabase.storage
                            .from("note-images")
                            .getPublicUrl(uploadData.path);
                        console.log("get image ", getData);
                        setImage(getData.publicUrl);

                        if (type == "create") {
                            console.log("create");
                            setNoteState ? setNoteState({ ...noteState, noteImage: getData.publicUrl }) : null;
                        }
                        else {
                            console.log("edit");
                            setNoteState ? setNoteState({ ...noteState, note_image: getData.publicUrl }) : null;
                        }
                    }}
                />
            </div>
        </>
    );
}

export default UploadImage
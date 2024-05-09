import axios from 'axios';
import { useForm } from "react-hook-form";
import InputField from '../../ui/elements/inputField.element';
import { useSelector } from 'react-redux';

function CreateProfile() {

    const { first_name, last_name, email, password, user_id } = useSelector((state: any) => state.auth.user.response.user)

    const updateProfile = async (data: any) => {
        const profile = {
            userId: user_id,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        }
        await axios.put('http://localhost:3000/user/update', profile)
            .then(() => {
                alert("updated!")
            })
            .catch((err) => {
                console.log("err")
                alert(err)
            })
    }
    const { control, handleSubmit, formState: { errors } } = useForm();
    const registerOptions = {
        firstName: { required: "First Name is required" },
        lastName: { required: "Last Name is required" },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        }
    };

    return (
        <div className='flex flex-col bg-white py-10'>
            <h1 className="text-3xl font-bold text-center">Your Profile</h1>
            <div className="flex flex-col justify-center m-auto my-5 ">
                <form onSubmit={handleSubmit(updateProfile)}>
                    <div className="flex max-w-[97%] justify-between">
                        <InputField
                            name="firstName"
                            value={first_name}
                            control={control}
                            placeholder="First Name"
                            rules={registerOptions.firstName}
                            errors={errors}
                            type="text"
                        />

                        <InputField
                            name="lastName"
                            value={last_name}
                            control={control}
                            placeholder="Last Name"
                            rules={registerOptions.lastName}
                            errors={errors}
                            className="ml-3"
                            type='text'
                        />
                    </div>

                    <InputField
                        name="email"
                        value={email}
                        control={control}
                        placeholder="Email"
                        disabled={true}
                        errors={errors}
                    />
                    <InputField
                        name="password"
                        value={password}
                        control={control}
                        placeholder="Password"
                        rules={registerOptions.password}
                        errors={errors}
                        type='password'
                    />
                    <div className='flex justify-center'>
                        <button type="submit" className="rounded-full bg-[#306BE9] text-white font-bold text-sm mt-6 px-10 py-2">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProfile
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import InputField from '../../ui/elements/inputField.element';
import { useDispatch, useSelector } from 'react-redux';
import { authActionCreator } from '../../../redux/actions/auth.actions';
import { useEffect } from "react";

function Signup(): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signupSuccess, isAuthenticated } = useSelector((state: any) => state.auth);

    const handleSignup = async (data: any) => {
        dispatch(authActionCreator.signupRequest(data));
        // dispatch(authActionCreator.verifyEmailRequest(data.email));
    };

    useEffect(() => {
        if (signupSuccess) {
            navigate('/verifyOtp', { state: true });
        }
    }, [signupSuccess, isAuthenticated])

    const registerOptions = {
        firstName: { required: "First Name is required" },
        lastName: { required: "Last Name is required" },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
            }
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        }
    };

    return (
        <div className='w-screen h-screen flex '>
            <div className="relative basis-1/2 flex flex-col justify-center items-center text-white bg-[#306BE9]">
                <h1 className="absolute top-0 left-0 text-3xl m-8 font-bold text-left ">
                    NotesX
                </h1>

                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold text-center ">
                        Welcome Back
                    </h1>
                    <p className="w-3/5 mt-2 text-sm leading-4 text-center">Already a user? Login using your info to access your dashboard.</p>
                    <button onClick={() => { navigate('/login') }} className="rounded-full border-[1px] border-gray-100  font-bold text-sm mt-6 px-10 py-2">Sign in</button>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
            <div className="basis-5/6 flex flex-col justify-center items-center pb-56">
                <div className="h-1/2 m-auto ">
                    <div className='m-auto'>
                        <h1 className="text-4xl font-bold text-center text-[#306BE9]">
                            Create Account
                        </h1>
                        <button className="flex items-center rounded-md mx-auto px-8 py-2 mt-8 border-2 text-black font-bold">
                            <FcGoogle />
                            <p className='ml-4'> Sign up with Google</p>
                        </button>
                        <p className='text-center mt-4'> or use your email for registration</p>
                    </div>

                    <div className="flex flex-col justify-center m-auto my-5 ">
                        <form onSubmit={handleSubmit(handleSignup)}>
                            <div className="max-w-[97%] flex justify-between">
                                <InputField
                                    name="firstName"
                                    control={control}
                                    placeholder="First Name"
                                    rules={registerOptions.firstName}
                                    errors={errors}
                                    className="mr-3"
                                    type="text"
                                />

                                <InputField
                                    name="lastName"
                                    control={control}
                                    placeholder="Last Name"
                                    rules={registerOptions.lastName}
                                    errors={errors}
                                    className="ml-3"
                                    type="text"
                                />
                            </div>

                            <InputField
                                name="email"
                                control={control}
                                placeholder="Email"
                                rules={registerOptions.email}
                                errors={errors}
                                type="email"
                            />
                            <InputField
                                name="password"
                                control={control}
                                placeholder="Password"
                                rules={registerOptions.password}
                                errors={errors}
                                type="password"
                            />
                            <div className='flex justify-between pt-7 px-12'>
                                <input type="checkbox" />
                                <p className="text-xs pl-2" >By Signing you agree to <span className="underline text-[#306BE9]">Terms and Conditions</span> of NotesX</p>
                            </div>
                            <div className='flex justify-center'>
                                <button type="submit" className="rounded-full bg-[#306BE9] text-white font-bold text-sm mt-6 px-10 py-2">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;

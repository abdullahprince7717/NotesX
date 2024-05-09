import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActionCreator } from '../../../redux/actions/auth.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import InputField from '../../ui/elements/inputField.element';
import { useSelector } from 'react-redux';


const Login: React.FC<ILoginProps> = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, error } = useSelector((state: any) => state.auth);

    const handleLogin = async (data: any) => {
        dispatch(authActionCreator.loginRequest(data));

    }
    const registerOptions = {
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

    useEffect(() => {
        if (location.state) {
            toast('You have successfully verified your account, You can now login.');
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/user/home');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error])

    return (
        <div className='w-screen h-screen flex '>
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

            <div className="basis-5/6">
                <div>
                    <h1 className="text-3xl m-8 font-bold text-left text-[#306BE9]">
                        NotesX
                    </h1>
                </div>
                <div className="h-1/2 m-auto pt-14">
                    <div className='w-[40%] m-auto'>
                        <h1 className="text-4xl font-bold text-center text-[#306BE9]">
                            Welcome Back
                        </h1>

                        <button className="flex items-center rounded-md mx-auto px-8 py-2 mt-5 border-2 text-black font-bold">
                            <FcGoogle />
                            <p className='ml-4'> Sign Up with Google</p>
                        </button>
                        <p className='text-center mt-4'> or use your email to sign in</p>
                    </div>

                    <div className="flex flex-col justify-center w-[40%] m-auto my-5  ">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <InputField
                                name="email"
                                control={control}
                                placeholder="Email"
                                rules={registerOptions.email}
                                errors={errors}
                                type='email'
                            />
                            <InputField
                                name="password"
                                control={control}
                                type="password"
                                placeholder="Password"
                                rules={registerOptions.password}
                                errors={errors}
                            />

                            <div className='flex justify-between pl-7 pr-10'>
                                <div className="mt-2 text-black text-xs ">
                                    <span className='mt-3 pr-1'> <input type="checkbox" /></span>
                                    Keep me Logged in
                                </div>
                                <button className="mt-2 hover:underline  text-black text-xs ">Forgot Password</button>
                            </div>

                            <div className='flex justify-center'>
                                <button type='submit' className="rounded-full bg-[#306BE9] text-white font-bold text-sm mt-6 px-10 py-2">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="basis-1/2 flex flex-col justify-center items-center text-white bg-[#306BE9]">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold text-center ">
                        Create Account
                    </h1>
                    <p className="w-3/5 mt-2 text-sm leading-4 text-center">Sign up to access your dashboard.</p>
                    <button onClick={() => { navigate('/signup') }} className="rounded-full border-[1px] border-gray-100  font-bold text-sm mt-6 px-10 py-2">Sign Up</button>
                </div>

            </div>
        </div>
    )
}

export default Login
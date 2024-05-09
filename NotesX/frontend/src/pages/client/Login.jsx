import { useState, useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()


    const handleLogin = async () => {
        try {
            localStorage.setItem('userEmail', email)
            if (localStorage.getItem('user')) {
                navigate('/user/home')
                return
            }
            if (email === '' || password === '') {
                toast('Please fill all the fields')
                return
            }
            const login = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                password: password
            })
            if (login) {
                dispatch(setUser(login?.data?.response));
                localStorage.setItem('user', JSON.stringify(login.data.response))
                setEmail('');
                setPassword('');
                navigate('/user/home')
            }
            else {
                toast('Error in logging in')
            }
        } catch (error) {
            if (error?.response?.status === 403) {
                toast(error?.response?.data?.error)
                await axios.post('http://localhost:3000/auth/verifyEmail', { email })
                navigate('/verifyOtp')
            }
            else {
                toast(error?.response?.data?.error || 'Error in logging in')
            }
            console.log('error', error)
        }
    }

    useEffect(() => {
        if (location.state) {
            toast('You have successfully verified your account, You can now login.')
        }
    }, [])


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
                transition:Bounce
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
                        <input
                            type="email"
                            className="w-5/6 rounded-md m-1 ml-6 p-4 bg-[#E9F0FF] text-xs text-gray-900"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="w-5/6 rounded-md m-1 ml-6 p-4 bg-[#E9F0FF] text-xs text-gray-900"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className='flex justify-between pl-7 pr-10'>
                            <div className="mt-2 text-black text-xs ">
                                <span className='mt-3 pr-1'> <input type="checkbox" /></span>
                                Keep me Logged in
                            </div>
                            <button className="mt-2 hover:underline  text-black text-xs ">Forgot Password</button>
                        </div>

                        <div className='flex justify-center'>
                            <button onClick={handleLogin} className="rounded-full bg-[#306BE9] text-white font-bold text-sm mt-6 px-10 py-2">Sign In</button>
                        </div>
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
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            if (email === '' || password === '' || firstName === '' || lastName === '') {
                toast('Please fill all the fields')
                return
            }
            const signUp = await axios.post('http://localhost:3000/auth/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            console.log('signUp', signUp)
            if (signUp.status === 200) {
                toast('Account Created Successfully!, Please check your email to verify OTP.')
                localStorage.setItem('userEmail', email)
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                navigate('/verifyOtp', { state: true })
            }
            else {
                toast('Error in creating account')
            }
        } catch (error) {
            toast('Error in creating account')
            console.log('error', error)
        }
    }

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
                    transition:Bounce
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
                        <span className="ml-6 max-w-[83%] flex justify-between">
                            <input
                                type="text"
                                className="w-3/5 rounded-md my-1 p-4 bg-[#E9F0FF] text-xs text-gray-900"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="w-3/5 rounded-md my-1 ml-3 p-4 bg-[#E9F0FF] text-xs text-gray-900"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </span>
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

                        <div className='flex justify-between pt-7 px-12'>
                            <input type="checkbox" />
                            <p className="text-xs pl-2" >By Signing you agree to <span className="underline text-[#306BE9]">Terms and Conditions</span> of NotesX</p>
                        </div>

                        <div className='flex justify-center'>
                            <button onClick={handleSignup} className="rounded-full bg-[#306BE9] text-white font-bold text-sm mt-6 px-10 py-2">Sign Up</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { authActionCreator } from '../../../redux/actions/auth.actions';
import { useSelector } from 'react-redux';


function VerifyOtp() {
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef<HTMLInputElement[]>([]);
    const Navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();
    const { email } = useSelector((state: any) => state.auth.user)
    const { isVerified } = useSelector((state: any) => state.auth)

    const handleVerify = async () => {
        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            toast.error('Please enter a valid OTP code');
            return;
        }
        dispatch(authActionCreator.verifyOtpRequest({ email, otp: otpCode }));
    };

    const handleOTPChange = (index: number, value: string) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
        // Move focus to the next input field if available
        if (value && index < otp.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };


    const handleResendOtp = async () => {
        dispatch(authActionCreator.verifyEmailRequest(email));
        toast('OTP sent successfully')
    }

    useEffect(() => {
        dispatch(authActionCreator.clearSignupSuccess());
        if (location.state) {
            toast('You have successfully created your account, Please verify otp sent to your email to login.')
        }
    }, [])

    useEffect(() => {
        if (isVerified) {
            Navigate('/login')
        }

    }, [isVerified])

    return (
        <div className='h-screen w-screen flex  justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500'>
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
            <div className='relative w-[80%] h-[80%] bg-gray-100 rounded-lg flex flex-col justify-center items-center'>
                <b className='absolute top-5 left-7 text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text '>NotesX</b>

                <p className='text-3xl font-semibold mb-10'>OTP Verification</p>
                <p className='text-lg mb-5 text-gray-700'>Enter the OTP code sent to your email :</p>
                <p className='font-semibold'>{email}</p>

                <div className='flex justify-center items-center m-10'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOTPChange(index, e.target.value)}
                            ref={(input) => (otpInputs.current[index] = input!)}
                            className='w-12 h-12 m-2 text-2xl text-center border-2 border-gray-500 rounded-md'
                        />
                    ))}
                </div>
                <p className='mb-10'>Didnt recieve OTP? <span className='text-blue-600 underline' onClick={handleResendOtp}>Resend OTP</span></p>
                <button onClick={handleVerify} className='px-14 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-xl text-white'>Verify</button>
            </div>
        </div>
    );
}

export default VerifyOtp
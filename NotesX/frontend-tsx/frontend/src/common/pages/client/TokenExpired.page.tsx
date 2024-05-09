import React from 'react';
import { useNavigate } from 'react-router-dom';

const TokenExpiredScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-6">Token Expired</h1>
            <p className="text-gray-600 mb-8">Your session has expired. Please log in again.</p>
            <button
                onClick={handleLoginClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Log In
            </button>
        </div>
    );
};

export default TokenExpiredScreen;

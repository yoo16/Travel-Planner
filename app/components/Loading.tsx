import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <FaSpinner className="animate-spin text-blue-500" size={50} />
                <p className="mt-4">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
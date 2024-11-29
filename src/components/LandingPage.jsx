import React, { useState } from 'react';

const LandingPage = ({ onProceed }) => {
    const [inputValue, setInputValue] = useState(sessionStorage.getItem("group_token") ?? '');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setError('');
    };

    const handleProceed = async () => {

        if (inputValue == '') {
            setError('Group API key is required.');
            return;
        }
        
        sessionStorage.setItem("group_token", inputValue);
        onProceed(inputValue);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-5 h-screen">
            <input
                id="group_token"
                name="group_token"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Group API key"
                className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ${
                    error ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    error ? 'focus:ring-red-500' : 'focus:ring-indigo-600'
                } sm:text-sm/6`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>} {}
            <button
                onClick={handleProceed}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Proceed
            </button>
        </div>
    );
};

export default LandingPage;

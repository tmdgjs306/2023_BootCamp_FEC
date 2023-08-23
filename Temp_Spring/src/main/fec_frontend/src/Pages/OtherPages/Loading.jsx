import React from 'react'
import { ImSpinner9 } from 'react-icons/im'; // Import a loading spinner icon

const Loading = () => {
    return (
<div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-white text-center">
        <ImSpinner9 className="animate-spin text-4xl mb-2 mx-auto" />
        <p>Loading...</p>
    </div>
</div>
);
};
export default Loading;
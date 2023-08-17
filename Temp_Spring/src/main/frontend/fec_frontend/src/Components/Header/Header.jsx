// hyper
import React from 'react'
import profileicon from '../../Assets/profileicon.png';
import bellicon from '../../Assets/bellicon.png';


const Header = () => {
    return (
        <div className="bg-[#14213d] h-16 px-4 flex items-center border-b border-gray-200 justify-between">
            <div className="flex items-center sm:justify-between sm:gap-4">
                <div className="text-left prose prose-lg text-2xl  py-3 text-gray-600">
                    <div
                        className="flex flex-1 items-center justify-between gap-8 sm:justify-end"
                    >
                        <div className="flex gap-4">
                            <a
                                href="/notication"
                                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-400 shadow-sm hover:text-gray-700"
                            >
                                <span className="sr-only">Notifications</span>
                                <img className='w-6 h-6' src={bellicon} alt='profile icon' />
                            </a>
                        </div>
                        <div className="group flex shrink-0 items-center rounded-lg transition">
                            <a
                                href="/profile"
                                className="t group relative flex justify-center rounded px-2 py-1.5 text-blue-700"
                            >
                                <span className="sr-only">Profile</span>
                                <img className='w-10 h-10' src={profileicon} alt='profile icon' />
                                <p className="ms-2 hidden text-left text-xs sm:block">
                                    <strong className="flex font-medium text-white text-lg hover:text-green-700"> Username</strong>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
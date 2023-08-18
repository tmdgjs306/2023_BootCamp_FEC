// hyper
import React from 'react'
import profileicon from '../../Assets/profileicon.png';


const Header = () => {
    return (
        <div className="bg-[#F2F7F2] h-16 px-4 flex items-center justify-between">
            <div className="text-left prose prose-lg text-2xl py-3 text-dark-600">
                FEC
            </div>
            <div className="flex gap-8">
                <a href="/profile" className="flex items-center rounded-lg transition">
                    <span className="sr-only">Profile</span>
                    <img className="w-10 h-10" src={profileicon} alt="profile icon" />
                </a>
            </div>
        </div>
    );
}

export default Header;

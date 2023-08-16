import React from 'react'
import logo from '../../LoginAssets/logo.png';
import profileicon from '../../Assets/profileicon.png';
import bellicon from '../../Assets/bellicon.png';

// icons
import { TbLayoutDashboard } from 'react-icons/tb'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiUserSettingsFill } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { ImLeaf } from 'react-icons/im'
import { IoFlower } from 'react-icons/io5'


const SideBar = () => {
    return (
        <div className="flex h-screen w-36 flex-col justify-between border-e bg-[#F2F7F2]">
            <div>
                <img className='relative flex justify-center w-16 h-16' src={logo} alt='Fec Logo' />
                {/* side bar menu parts */}
                <div className="border-t border-gray-200">
                    <div className="px-2">
                        <ul className="space-y-10 pt-6">
                            <li>
                                <a
                                    href="/dashboard"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700 "
                                >
                                    <TbLayoutDashboard className='icon w-9 h-9' />

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Dashboard
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/profile"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700 "
                                >

                                    <img className='w-10 h-10' src={profileicon} alt='profile icon' />
                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Profile
                                    </span>

                                </a>
                            </li>
                            <li>
                                <a
                                    href="/notication"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700"
                                >

                                    <img className='w-6 h-6' src={bellicon} alt='profile icon' />
                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Notication
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/overview"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700 "

                                >
                                    <ImStatsDots className='icon w-7 h-7' />

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Overview
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/manage-users"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700"
                                >

                                    <RiUserSettingsFill className='icon w-8 h-8' />
                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Users
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/performance"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700"
                                >
                                    <IoFlower className='icon w-8 h-8' />
                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Performance
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/plant-status"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700"
                                >
                                    <ImLeaf className='icon w-8 h-8' />

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Plant status
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-[#F2F7F2] p-2">
                <form action="/log-out">
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:text-orange-700 text-grey-700"
                    >
                        <IoLogOutOutline className='icon w-8 h-8' />

                        <span
                            className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 hover:text-green-700"
                        >
                            Logout
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SideBar
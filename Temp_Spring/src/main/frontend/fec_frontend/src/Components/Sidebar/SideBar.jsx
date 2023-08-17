import logo from '../../LoginAssets/logo.png';

// icons
import { TbLayoutDashboard } from 'react-icons/tb'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiUser5Fill } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { ImLeaf } from 'react-icons/im'
import { IoFlower } from 'react-icons/io5'
import { PiUsersThreeFill } from 'react-icons/pi';
import { TbBellFilled } from 'react-icons/tb';



const SideBar = () => {
    const handleLogout = () => {
        navigate('/');
    };
    return (
        <div className="z-20 flex-shrink-0 hidden w-40 pl-2 overflow-y-auto md:block h-screen bg-[#F2F7F2] items-center">
            <div className=''>
                <img className='flex justify-center h-16 w-16' src={logo} alt='Fec Logo' />
                {/* menu parts */}
                <div className="border-t border-gray-200">
                    <div className="px-2">
                        <ul className="space-y-10 pt-6">
                            <li>
                                <a
                                    href="/dashboard"
                                    className="group relative flex justify-center rounded px-2 py-1 text-gray-500 hover:text-orange-700 text-green-700 "
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

                                    <RiUser5Fill className='icon w-9 h-9' />
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

                                    <TbBellFilled className='icon w-9 h-9' />
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
                                    href="/manageuser"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-orange-700 text-green-700"
                                >

                                    <PiUsersThreeFill className='icon w-8 h-8' />
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
                                    href="/status"
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
                    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-[#F2F7F2] p-2">
                        <form action="/log-out">
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:text-orange-700 text-grey-700"
                            >
                                <IoLogOutOutline className='icon w-10 h-10' />

                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 hover:text-green-700"
                                    onClick={handleLogout}>
                                    Logout
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SideBar
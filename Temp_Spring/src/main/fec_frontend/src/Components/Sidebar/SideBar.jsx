import logo from '../../LoginAssets/logo.png';

// icons
import { TbLayoutDashboard } from 'react-icons/tb'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiUser5Fill } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { ImLeaf } from 'react-icons/im'
import { IoFlower } from 'react-icons/io5'
import { PiUsersThreeFill } from 'react-icons/pi';


// was better if link used by menu const

const SideBar = () => {
    const handleLogout = () => {
        navigate('/');
    };
    return (
        <div className="bg-[#dff3e4] left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden ease-linear">
            {/* header */}
            <div className='flex items-center justify-between gap-2 px-4 py-1.5 lg:py-5.5'>
                <img className='flex justify-center h-16 w-16 transition-transform transform hover:scale-110' src={logo} alt='Fec Logo' />
            </div>
            {/* menu parts */}
            <div className="flex-1">
                <div className="px-8">
                    <ul className="space-y-auto pt-4">
                        <li>
                            <a
                                href="/dashboard"
                                className="group relative flex flex-col items-center rounded px-2 py-4"
                            >

                                <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                    <TbLayoutDashboard className='icon w-6 h-6' />
                                </div>
                                <span
                                    className="mt-1 text-md font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                >
                                    Dashboard
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="group relative flex flex-col items-center rounded px-2 py-4 group-hover:text-orange-700 text-green-700"
                            >
                                <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                    <RiUser5Fill className='icon w-7 h-7' />
                                </div>

                                <span
                                    className="mt-1 text-md font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                >
                                    Profile
                                </span>

                            </a>
                        </li>

                        <li>
                            <a
                                href="/overview"
                                className="group relative flex flex-col items-center rounded px-2 py-4 "

                            >

                                <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                    <ImStatsDots className='icon w-7 h-7' />
                                </div>
                                <span
                                    className="mt-1 text-md font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                >
                                    Overview
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/manageuser"
                                className="group relative flex flex-col items-center rounded px-2 py-4 "
                            >
                                <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                    <PiUsersThreeFill className='icon w-7 h-7' />
                                </div>

                                <span
                                    className="mt-1 text-md font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                >
                                    Manage users
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/performance"
                                className="group relative flex flex-col items-center rounded px-2 py-4"
                            >
                                <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                    <IoFlower className='icon w-7 h-7' />
                                </div>

                                <span
                                    className="mt-1 text-md font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                >
                                    Performance
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/status"
                                className="group relative flex flex-col items-center rounded px-2 py-4"
                            >
                                <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                    <ImLeaf className='icon w-7 h-7' />
                                </div>
                                <span
                                    className="mt-1 text-md font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                >
                                    Plant status
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-300 p-9">
                    <form action="/api/log-out" method="get">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg px-2 py-0.5 text-sm text-gray-500 hover:text-orange-700 text-grey-700"
                        >
                            <div className='mt-1 text-xs font-medium text-green-600 group-hover:text-orange-700 text-green-700'>
                                <IoLogOutOutline className='icon w-10 h-10' />

                                <span
                                    className="mt-1 text-xs font-medium text-green-600 opacity-80 group-hover:text-orange-700 text-green-700"
                                    onClick={handleLogout}>
                                    Logout
                                </span>
                            </div>
                        </button>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default SideBar
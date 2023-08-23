import React from 'react'
import forbiddenImg from '../../Assets/forbidden.png';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
    return (
        <div className='bg-[#dff3e4]'>
            <div className="lg:px-24 lg:py-24 md:py-10 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative p-10">
                        <div className="absolute">
                            <div className='p-2'>
                                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    Oops, You are not allowed to be here.
                                </h1>

                                <Link to="/" className="sm:w-full lg:w-auto">
                                    <button className="border rounded md py-6 px-10 text-center bg-green-600 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                                        Back to FEC home!
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={forbiddenImg} alt='Nonauthenicated' />
                </div>
            </div>
        </div>
    )
}

export default ForbiddenPage
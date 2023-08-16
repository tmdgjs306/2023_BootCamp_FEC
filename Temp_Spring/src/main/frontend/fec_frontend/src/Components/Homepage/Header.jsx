import React from 'react';
import logo from '../../LoginAssets/logo.png';

const Header = () => {
    return (
        <header className="bg-white dark:bg-gray-900 fixed w-full z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <a className="block text-teal-600 dark:text-teal-600" href="/">
                            <span className="sr-only">Home</span>
                            <img
                                viewBox="0 0 28 24"
                                className="w-16 h-16"
                                src={logo}
                                alt="Fec Logo"
                            />
                        </a>
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-lg">
                                <li>
                                    <a
                                        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-orange/75"
                                        href="/"
                                    >
                                        Home
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex sm:gap-4">
                            <a
                                className="rounded-md bg-teal-600 px-5 py-3.5 text-sm font-medium text-white shadow dark:hover:bg-orange-500 shadow-xl transition hover:border-pink-500/10 hover:shadow-orange-500/10"
                                href="/login"
                            >
                                Log in
                            </a>
                            <a className="px-5 py-2.5 text-md leading-relaxed text-white">
                                or
                            </a>
                            <a
                                className="rounded-md bg-teal-600 px-5 py-3.5 text-sm font-medium text-white shadow dark:hover:bg-orange-500 shadow-xl transition hover:border-pink-500/10 hover:shadow-orange-500/10"
                                href="/join"
                            >
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

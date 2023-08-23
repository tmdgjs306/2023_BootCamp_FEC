import React from 'react';
import SideBar from '../Sidebar/SideBar';

const DashboardLayout = ({ children, pageTitle }) => {
    return (
        <div className="flex h-screen bg-[#14213d]">
            <SideBar />
            <div className="flex-grow p-6">
                <header className="mb-4">
                    <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">{pageTitle}</h1>
                </header>
                <main className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6'>{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;

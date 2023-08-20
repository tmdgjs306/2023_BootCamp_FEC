import React from 'react';
import SideBar from '../Sidebar/SideBar';


const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#14213d] overflow-hidden">
            <SideBar />
            <div className="flex-grow p-6 ">
                <main className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;

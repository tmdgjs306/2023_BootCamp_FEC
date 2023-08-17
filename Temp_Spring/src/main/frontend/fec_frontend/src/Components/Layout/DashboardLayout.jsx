import React from 'react';
import SideBar from '../Sidebar/SideBar';
import Header from '../Header/Header';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#14213d]">
            <SideBar />
            <div className="flex-1 p-8">
                <Header />
                <div className='mt-8'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
import React from 'react';
import SideBar from '../Sidebar/SideBar';
import Header from '../Header/Header';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-[#14213d]">
            <SideBar />
            <div className="flex-1 ">
                <Header />
                <div className='mt-10 grid grid-col-3'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
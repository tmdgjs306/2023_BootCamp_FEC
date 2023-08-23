import React from 'react';
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
import PlantStatusMain from '../../../Components/PlantStatusMain.jsx/PlantStatusMain';
import VideoContainer from '../../../Components/AI/VideoContainer.jsx';
import SideBar from '../../../Components/Sidebar/SideBar';

const Status = () => {
    return (
        <div className='bg-[#14213d]'>
            <div className="grid grid-cols-5 grid-rows-5 gap-4">
                <div className="row-span-5"><SideBar /></div>
                <div className="col-span-2 row-span-5"><VideoContainer /></div>
                <div className="col-span-2 row-span-3 col-start-4 row-start-3"><PlantStatusMain /></div>
            </div>
        </div>
    )
}

export default Status;
import React from 'react';
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
import OverviewMain from '../../../Components/Overview/OverviewMain';
import WeatherOverview from '../../../Components/Overview/WeatherOverview';
// icons
import { FcAbout } from 'react-icons/fc'
import { WiSunrise } from 'react-icons/wi'

const Overview = () => {
    return (
        <DashboardLayout pageTitle="OVERVIEW">
            <DashboardItem
                icon={<FcAbout className="w-10 h-10 text-[#14213d]" />}
            >
                <OverviewMain />
            </DashboardItem>
            <DashboardItem
                icon={<WiSunrise className="w-10 h-10 text-[#14213d]" />}
            >
                <WeatherOverview />

            </DashboardItem>
        </DashboardLayout >

    )
}
const DashboardItem = ({ icon, children }) => (
    <div className=''>
        <div className='bg-[#f5fcf5] p-4 rounded-lg shadow-xl' >
            <div className="flex items-center justify-between">
                {icon}
            </div>
            {children}
        </div>
    </div>
);

export default Overview;
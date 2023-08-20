import React from 'react';
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
import Performancemain from '../../../Components/PerformanceMain/Performancemain';
//icon
import { FcCalendar } from 'react-icons/fc';


const Performance = () => {
    return (
        <DashboardLayout>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 ">
                <DashboardItem
                    title="Goal"
                    icon={<FcCalendar className="w-10 h-10 text-[#52b69a]" />}
                >
                    <Performancemain />

                </DashboardItem>

            </div>
        </DashboardLayout>
    )
}

const DashboardItem = ({ title, icon, children }) => (
    <div className="font-Gruppo bg-[#F2F7F2] p-6 w-100 h-100 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-1">
            {icon}
            <p className="text-base text-center font-Gruppo">{title}</p>
        </div>
        {children}
    </div>
);

export default Performance;
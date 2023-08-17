import './Dashboard.css';

import TemperatureCharBar from '../../../Components/Charbar/TemperatureCharBar';
import HumidityCharbar from '../../../Components/Charbar/HumidityCharBar';
import Co2CharBar from '../../../Components/Charbar/co2CharBar';
import Chartline from '../../../Components/Chartline/chartline';
// icons
import { FaTemperatureLow } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import DashboardLayout from '../../../Components/Layout/DashboardLayout';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="m-auto grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <DashboardItem
                    title="Temperature Data"
                    icon={<FaTemperatureLow className="w-16 h-16 text-blue-600" />}
                >
                    <TemperatureCharBar />
                </DashboardItem>
                <DashboardItem
                    title="Humidity Data"
                    icon={<WiHumidity className="w-16 h-16 text-blue-600" />}
                >
                    <HumidityCharbar />
                </DashboardItem>
                <DashboardItem
                    title="CO2 Data"
                    icon={<MdCo2 className="w-16 h-16 text-blue-600" />}
                >
                    <Co2CharBar />
                </DashboardItem>
            </div>
            <div className="mt-6">
                <div className="bg-white p-4 rounded-lg shadow-md tile-marker">
                    <Chartline />
                    <p className="text-base">Chart Line</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

const DashboardItem = ({ title, icon, children }) => (
    <div className="bg-[#F2F7F2] p-4 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-2">
            {icon}
            <p className="text-base text-center">{title}</p>
        </div>
        {children}
    </div>
);

export default Dashboard;


import './Dashboard.css';

import TemperatureCharBar from '../../../Components/Charbar/TemperatureCharBar';
import HumidityCharbar from '../../../Components/Charbar/HumidityCharBar';
import Co2CharBar from '../../../Components/Charbar/co2CharBar';
import HumidityChart from '../../../Components/Charbar/HumidityForDashboard';
import Chartline from '../../../Components/Chartline/chartline';
// icons
import { FaTemperatureLow } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import DashboardLayout from '../../../Components/Layout/DashboardLayout';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="overflow-hidden m-auto grid grid-cols-1 mx-auto md:grid-cols-3 gap-4 ">
                <DashboardItem
                    title="Temperature Data"
                    icon={<FaTemperatureLow className="w-10 h-10 text-[#52b69a]" />}
                >
                    <TemperatureCharBar />
                </DashboardItem>
                <DashboardItem
                    title="Humidity Data"
                    icon={<WiHumidity className="w-10 h-10 text-[#bbadff]" />}
                >
                    <HumidityChart />
                </DashboardItem>
                <DashboardItem
                    title="Carbon dioxide data"
                    icon={<MdCo2 className="w-10 h-10 text-blue-500" />}
                >
                    <Co2CharBar />
                </DashboardItem>
                {/* <DashboardItem
                    title="Chart Line"
                    icon={<MdCo2 className="w-16 h-16 text-blue-600" />}
                >
                    <ChartLine />
                </DashboardItem> */}
            </div>
        </DashboardLayout>
    );
};

const DashboardItem = ({ title, icon, children }) => (
    <div className="font-Gruppo bg-[#F2F7F2] p-6 w-100 h-100 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-1">
            {icon}
            <p className="text-base text-center font-Gruppo">{title}</p>
        </div>
        {children}
    </div>
);

export default Dashboard;


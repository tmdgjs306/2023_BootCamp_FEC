// layout
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
// charts
import TemperatureCharBar from '../../../Components/Charbar/TemperatureCharBar';
import Co2CharBar from '../../../Components/Charbar/co2CharBar';
import HumidityChart from '../../../Components/Charbar/HumidityForDashboard';
import ChartComponent from '../../../Components/Chartline/chartline';
// icons
import { FaTemperatureLow } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import { FcAreaChart } from 'react-icons/fc'

const Dashboard = () => {
    return (
        <DashboardLayout>
            <DashboardItem
                title="Temperature Data"
                icon={<FaTemperatureLow className="w-10 h-10 text-[#52b69a]" />}

            >
                <TemperatureCharBar />
            </DashboardItem>
            <DashboardItem
                title="Humidity Data"
                icon={<WiHumidity className="w-10 h-10 text-[#8ac926]" />}
            >
                <HumidityChart />
            </DashboardItem>
            <DashboardItem
                title="Carbon dioxide data"
                icon={<MdCo2 className="w-10 h-10 text-blue-500 text-[#ff595e]" />}
            >
                <Co2CharBar />
            </DashboardItem>
            <DashboardItem
                title="Chart Line"
                icon={<FcAreaChart className="w-10 h-10 text-blue-600" />}
                fullWidth={true}
            >
                <ChartComponent />
            </DashboardItem>
        </DashboardLayout>
    );
};

const DashboardItem = ({ title, icon, children, fullWidth }) => (
    <div className={`bg-[#F2F7F2] p-4 rounded-lg shadow-xl ${fullWidth ? 'col-span-3' : ''}`}>
        <div className="flex items-center justify-between">
            {icon}
            <p className="text-base text-center font-Gruppo">{title}</p>
        </div>
        {children}
    </div>
);

export default Dashboard;


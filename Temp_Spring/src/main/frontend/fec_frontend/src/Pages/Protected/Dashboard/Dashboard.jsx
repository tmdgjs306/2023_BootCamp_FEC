// layout
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
// charts
import TemperatureCharBar from '../../../Components/Charbar/TemperatureCharBar';
import Co2CharBar from '../../../Components/Charbar/co2CharBar';
import HumidityChart from '../../../Components/Charbar/HumidityForDashboard';
import ChartComponent from '../../../Components/Chartline/chartline';
// icons
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'
import { AiOutlineAreaChart } from 'react-icons/ai'

const Dashboard = () => {
    return (
        <DashboardLayout pageTitle="DASHBOARD">
            <DashboardItem
                title="Temperature Data"
                icon={<LiaTemperatureLowSolid className="w-10 h-10 text-[#14213d]" />}
            >
                <TemperatureCharBar />
            </DashboardItem>
            <DashboardItem
                title="Humidity Data"
                icon={<WiHumidity className="w-10 h-10 text-[#14213d]" />}
            >
                <HumidityChart />
            </DashboardItem>
            <DashboardItem
                title="Carbon dioxide data"
                icon={<MdCo2 className="w-10 h-10 text-[#14213d]" />}
            >
                <Co2CharBar />
            </DashboardItem>
            <DashboardItem
                title="Chart Line"
                icon={<AiOutlineAreaChart className="w-8 h-8 text-[#14213d]" />}
                fullWidth={true}
            >
                <ChartComponent />
            </DashboardItem>
        </DashboardLayout>
    );
};

const DashboardItem = ({ title, icon, children, fullWidth }) => (
    <div className={`bg-[#f5fcf5] p-4 rounded-lg shadow-xl ${fullWidth ? 'col-span-3' : ''}`}>
        <div className="flex items-center justify-between">
            {icon}
            <p className="text-base text-center font-Gruppo">{title}</p>
        </div>
        {children}
    </div>
);

export default Dashboard;


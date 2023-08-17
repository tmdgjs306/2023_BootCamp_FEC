import './Dashboard.css';
// import Header from '../../../Components/Header/Header'; // Import the Header component
import SideBar from '../../../Components/Sidebar/SideBar';
import TemperatureCharBar from '../../../Components/Charbar/TemperatureCharBar';
import HumidityCharbar from '../../../Components/Charbar/HumidityCharBar';
import Co2CharBar from '../../../Components/Charbar/co2CharBar';
import Chartline from '../../../Components/Chartline/chartline';
// icons
import { FaTemperatureLow } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { MdCo2 } from 'react-icons/md'

const Dashboard = () => {
    return (
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-[#14213d]">
            <SideBar />
            {/* <Header /> */}
            <div className='mt-4'>
                <div className="container px-6 py-8 mx-auto">
                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                        <div className="bg-[#F2F7F2] p-8 space-y-3 border-2 rounded-xl">
                            <TemperatureCharBar />
                            <p className="text-center">Temperature Data</p>
                            <FaTemperatureLow className='icon w-9 h-9 text-blue-600 hover:text-orange-300 text-blue-600 inline-flex' />
                        </div>
                        <div className=" bg-[#F2F7F2] p-8 space-y-3 border-2 rounded-xl">
                            <HumidityCharbar />
                            <p className="text-center">Humidity Data</p>
                            <WiHumidity className='icon w-9 h-9 text-blue-600 hover:text-orange-300 text-blue-600' />
                        </div>
                        <div className=" bg-[#F2F7F2] p-8 space-y-3 border-2 rounded-xl">
                            <Co2CharBar />
                            <p className="text-center">CO2 Data</p>
                            <MdCo2 className='icon w-9 h-9 text-blue-600 hover:text-orange-300 text-blue-600' />
                        </div>
                    </div>
                    <div className=" justify-center bg-white p-4 rounded-lg shadow-md h-200px w-500px">
                        <div className='bg-[#F2F7F2] pd-2 py-4 w-full'>
                            <Chartline />
                            <p className="text-center">By Chart Line</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

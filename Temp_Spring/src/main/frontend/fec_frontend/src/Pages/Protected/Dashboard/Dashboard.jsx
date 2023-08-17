import './Dashboard.css';
// import Header from '../../../Components/Header/Header'; // Import the Header component -> after layout fix
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
        <div className=" flex overflow-hidden w-screen h-screen bg-[#14213d]">
            <SideBar />
            <div className='grid mb-4 pb-10 px-8 mx-4 rounded-3xl'>
                <div className="grid grid-cols-12 gap-6">
                    <div className="grid grid-cols-12 col-span-12 gap-6 xl:col-span-9">
                        <div className='col-span-12 mt-8 justify-between'>
                            <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#F2F7F2] ">
                                <TemperatureCharBar />
                                <p className="text-base">Temperature Data</p>
                                <FaTemperatureLow className='icon w-9 h-9 text-blue-600 hover:text-orange-300 text-blue-600 inline-flex' />
                            </div>
                            <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#F2F7F2] ">
                                <HumidityCharbar />
                                <p className="text-base">Humidity Data</p>
                                <WiHumidity className='icon w-9 h-9 text-blue-600 hover:text-orange-300 text-blue-600' />
                            </div>
                            <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#F2F7F2] ">
                                <Co2CharBar />
                                <p className="text-base">CO2 Data</p>
                                <MdCo2 className='icon w-9 h-9 text-blue-600 hover:text-orange-300 text-blue-600' />
                            </div>
                        </div>
                        <div className=" justify-center bg-white p-4 rounded-lg shadow-md h-200px w-500px">
                            <div className='bg-[#F2F7F2] pd-2 py-4 w-full'>
                                <Chartline />
                                <p className="text-base">By Chart Line</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

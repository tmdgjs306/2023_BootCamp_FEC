import './Dashboard.css';
import Header from '../../../Components/Header/Header'; // Import the Header component -> after layout fix
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
        <div className=" flex flex-row h-screen w-screen overflow-hidden bg-[#14213d]">
            <SideBar />
            <div className='flex 1'>
                <Header />
                <div className="grid grid-cols-12 gap-6">
                    <div className="grid grid-cols-12 col-span-12 gap-6 xl:col-span-9">
                        <div className='col-span-12 mt-5 mb-5 flex space-x-4'>
                            <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#F2F7F2] ">
                                <div className='p-4'>
                                    <TemperatureCharBar />
                                    <p className="text-base text-center">Temperature Data</p>
                                    <FaTemperatureLow className='icon w-16 h-16 text-blue-600 hover:text-orange-300 text-blue-600 inline-flex' />

                                </div>
                                <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#F2F7F2] ">

                                    <div className=''>
                                        <HumidityCharbar />
                                        <p className="text-base text-center">Humidity Data</p>
                                        <WiHumidity className='icon w-16 h-16 text-blue-600 hover:text-orange-300 text-blue-600' />

                                    </div>
                                    <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#F2F7F2] ">
                                        <div className=''>
                                            <Co2CharBar />
                                            <p className="text-base text-center">CO2 Data</p>
                                            <MdCo2 className='icon w-16 h-16 text-blue-600 hover:text-orange-300 text-blue-600' />

                                        </div>
                                    </div>
                                </div>
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
        </div >
    )
}

export default Dashboard;

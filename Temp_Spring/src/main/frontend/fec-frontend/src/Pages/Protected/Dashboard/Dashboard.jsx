import React from 'react';
import './Dashboard.css';
// import Header from '../../../Components/Header/Header'; // Import the Header component
import SideBar from '../../../Components/Sidebar/SideBar';
import TemperatureCharBar from '../../../Components/Charbar/TemperatureCharBar';
import HumidityCharbar from '../../../Components/Charbar/HumidityCharBar';
import Co2CharBar from '../../../Components/Charbar/co2CharBar';
import Chartline from '../../../Components/Chartline/chartline';

const Dashboard = () => {
    return (
        <div className=" min-h-screen flex bg-[#14213d]">
            <SideBar />
            <div className="flex-1 flex flex-col ">

                {/* <Header /> */}
                {/* Move the Header component here */}
                <div className="flex flex-col">

                    <div className="flex justify-center items-start gap-8 sm:px-6 lg:px-16">
                        <div className="flex-1 bg-[#F2F7F2] p-4 rounded-lg shadow-md shadow-white">
                            <TemperatureCharBar />
                            <p className="text-center">Temperature Data</p>
                        </div>
                        <div className="flex-1 bg-[#F2F7F2] p-4 rounded-lg shadow-md shadow-white">
                            <HumidityCharbar />
                            <p className="text-center">Humidity Data</p>
                        </div>
                        <div className="flex-1 bg-[#F2F7F2] p-4 rounded-lg shadow-md shadow-white">
                            <Co2CharBar />
                            <p className="text-center">CO2 Data</p>
                        </div>
                    </div>
                    <div className=" flex justify-center bg-white p-4 rounded-lg shadow-md">
                        <Chartline />
                        <p className="text-center">By Chart Line</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

import React, { useState, useEffect } from 'react'
import axios from "axios";
// react icons


const PlantStatusMain = () => {
    const [statusData, setStatusData] = useState({
        minTemperature: '17',
        maxTemperature: '23',
        minHumidity: '12',
        maxHumidity: '89',
        illuminance: '456',
        carbonDioxide: '843',
    });
    const [name, setName] = useState('');

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getPlantEnvironmentDataByName', { name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStatusData(response.data); // Assuming the response data matches the structure of statusData

        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    return (
        <div className='col-span-3 row-span-2 col-start-3 row-start-3'>
            <div className="bg-[#f2f2f2] rounded-xl p-4">
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md shadow-sm"
                    placeholder="Enter name"
                />
                <button
                    onClick={fetchData} // Changed the event handler to fetchData
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-500 rounded"
                >
                    Get Data
                </button>
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr className='bg-[#f2f2f2]'>
                            <th scope="col" className="px-10 py-4">Rate</th>
                            <th scope="col" className="px-10 py-8">General range</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-green-200 dark:border-neutral-500 dark:hover:bg-green-200">
                            <th scope="col" className="px-6 py-4">Temperature min</th>
                            <td className="whitespace-nowrap px-10 py-4">{statusData.minTemperature}</td>

                        </tr>
                        <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-green-200">
                            <th scope="col" className="px-6 py-4">Temperature max</th>
                            <td className="whitespace-nowrap px-10 py-4">{statusData.maxTemperature}</td>

                        </tr>
                        <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-green-200">
                            <th scope="col" className="px-6 py-4">Humidity min</th>
                            <td className="whitespace-nowrap px-6 py-4">{statusData.maxTemperature}</td>

                        </tr>
                        <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-green-200">
                            <th scope="col" className="px-6 py-4">Humidity max</th>
                            <td className="whitespace-nowrap px-6 py-4">{statusData.maxTemperature}</td>

                        </tr>
                        <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-green-200">
                            <th scope="col" className="px-6 py-4">Illuminance</th>
                            <td className="whitespace-nowrap px-6 py-4">{statusData.illuminance}</td>

                        </tr>
                        <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-green-200">
                            <th scope="col" className="px-6 py-4">CO2</th>
                            <td className="whitespace-nowrap px-6 py-4">{statusData.carbonDioxide}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlantStatusMain

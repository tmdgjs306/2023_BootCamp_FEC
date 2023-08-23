import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const OverviewMain = () => {
    const [sensorData, setSensorData] = useState({
        Temperature: 123, // fake data gotta change to ''
        Humidity: 456,
        CarbonDioxide: 789,
    });
    const [hour, setPostHour] = useState("100"); // default 1 hour

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getAvgData', { hour }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let jsonString = JSON.stringify(response.data);
            const avgData = JSON.parse(jsonString);
            setSensorData(avgData);
            console.log(sensorData.Temperature, " ", sensorData.Humidity, " ", sensorData.CarbonDioxide);
            // Update the state with fetched sensor data
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [hour]);

    const options = {
        chart: {
            width: 380,
            type: 'polarArea',
        },
        labels: ['Temperature', 'Humidity', 'Carbon Dioxide'],
        fill: {
            opacity: 1,
        },
        stroke: {
            width: 1,
            colors: undefined,
        },
        yaxis: {
            show: false,
        },
        legend: {
            position: 'bottom',
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0,
                },
                spokes: {
                    strokeWidth: 0,
                },
            },
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6,
            },
        },
    };

    const series = [sensorData.Temperature, sensorData.Humidity, sensorData.CarbonDioxide];

    return (
        <div className='col-span-2 row-span-5'>
            <div className="bg-[#f5fcf5] p-4 rounded shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Averages of sensor datas</h2>
                <div className="mb-6">
                    <label htmlFor="postHour" className="block text-sm font-medium text-gray-700">
                        Select a hour:
                    </label>
                    <select
                        id="postHour"
                        name="postHour"
                        value={hour}
                        onChange={(e) => setPostHour(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="1">1 hour</option>
                        <option value="6">6 hours</option>
                        <option value="24">1 day</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div>
                    <ReactApexChart options={options} series={series} type="polarArea" height={380} />
                </div>
            </div>
        </div>
    );
};

export default OverviewMain;


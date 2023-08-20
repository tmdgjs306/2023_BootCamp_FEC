import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const OverviewMain = () => {
    const [sensorData, setSensorData] = useState({
        temperature: ('34'), // fake data gotta change to ''
        humidity: '77',
        carbonDioxide: '456',
    });
    const [postHour, setPostHour] = useState(1); // default 1 hour

    const fetchData = async () => {
        try {
            const response = await axios.post('api/getAvgData', {
                postHour: postHour,
            });

            const { temperature, humidity, carbonDioxide } = response.data;

            // Update the state with fetched sensor data
            setSensorData({
                temperature,
                humidity,
                carbonDioxide,
            });
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [postHour]);

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

    const series = [sensorData.temperature, sensorData.humidity, sensorData.carbonDioxide];

    return (
        <div className="bg-[#f5fcf5] p-4 rounded shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Averages of sensor datas</h2>
            <div className="mb-6">
                <label htmlFor="postHour" className="block text-sm font-medium text-gray-700">
                    Select a hour:
                </label>
                <select
                    id="postHour"
                    name="postHour"
                    value={postHour}
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
    );
};

export default OverviewMain;



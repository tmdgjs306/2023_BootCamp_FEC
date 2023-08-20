import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const TemperatureCharBar = () => {
    // need to change useSate to []
    const [outsideTemperature, setOutsideTemperature] = useState(34);
    const [insideTemperature, setInsideTemperature] = useState(24);

    const options = {
        chart: {
            height: 180,
            type: 'radialBar',
        },
        series: [outsideTemperature, insideTemperature],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        formatter: function (val) {
                            return val + "°C"; // Display the value with the degree symbol and "°C"
                        },
                    },
                },
            },
        },
        fill: {
            colors: ['#14213d', '#4c7de7'], // Set colors inside, outside
        },
        labels: ['Outside', 'Inside']
    };

    const fetchData = () => {
        // Fetch OUTSIDE temperature data
        axios.get('/api/getWeather')
            .then(response => {
                const temperatureValue = JSON.parse(response.data).temperatureValue;
                setOutsideTemperature(temperatureValue);
            })
            .catch(error => {
                console.error('Error fetching outside temperature:', error);
            });

        // Fetch INSIDE temperature data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                const temperatureValue = JSON.parse(response.data).temperatureValue;
                setInsideTemperature(temperatureValue);
            })
            .catch(error => {
                console.error('Error fetching inside temperature:', error);
            });
    };

    useEffect(() => {
        fetchData();
        // Fetch new data every 10 seconds
        const interval = setInterval(fetchData, 10000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div >
            <ApexCharts options={options} series={options.series} type="radialBar" height={180} />
        </div>
    );
};

export default TemperatureCharBar;

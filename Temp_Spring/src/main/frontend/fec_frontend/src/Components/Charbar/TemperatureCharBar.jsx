import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const HumidityChart = () => {
    // need to change useSate to []
    const [outsideTemperature, setOutsideTemperature] = useState(34);
    const [insideTemperature, setInsideTemperature] = useState(24);

    const options = {
        chart: {
            height: 180,
            type: 'radialBar',
        },
        series: [insideTemperature, outsideTemperature],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        formatter: function (val) {
                            return val + " °C"; // Display the value with the degree symbol and "°C"
                        },
                    },
                },
            },
        },
        fill: {
            colors: ['#52b69a', '#b5e48c'], // Set colors inside, outside
        },
        labels: ['Inside', 'Outside']
    };

    useEffect(() => {
        // Fetch OUTSIDE temperature data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                let String = JSON.stringify(response.data);
                setOutsideTemperature(JSON.parse(String).temperatureValue);
            })
            .catch(error => {
                console.error('Error fetching outside temperature:', error);
            });

        // Fetch INSIDE temperature data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                let String = JSON.stringify(response.data);
                setOutsideTemperature(JSON.parse(String).temperatureValue);
            })
            .catch(error => {
                console.error('Error fetching inside temperature:', error);
            });
    }, []);

    return (
        <div >
            <ApexCharts options={options} series={options.series} type="radialBar" height={180} />
        </div>
    );
};

export default HumidityChart;

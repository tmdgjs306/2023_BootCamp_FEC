import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const HumidityChart = () => {
    // need to change useSate to []
    const [outsideTemperature, setOutsideTemperature] = useState(25);
    const [insideTemperature, setInsideTemperature] = useState(28);

    const options = {
        chart: {
            height: 280,
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
        // Fetch outside temperature data
        axios.get('api/getWeather')
            .then(response => {
                const { temperature } = response.data;
                setOutsideTemperature(temperature);
            })
            .catch(error => {
                console.error('Error fetching outside temperature:', error);
            });

        // Fetch inside temperature data
        axios.get('api/latestEnvironmentData')
            .then(response => {
                const { temperature } = response.data;
                setInsideTemperature(temperature);
            })
            .catch(error => {
                console.error('Error fetching inside temperature:', error);
            });
    }, []);

    return (
        <div>
            <ApexCharts options={options} series={options.series} type="radialBar" height={280} />
        </div>
    );
};

export default HumidityChart;

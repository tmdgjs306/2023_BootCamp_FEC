import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const HumidityChart = () => {
    // need to change useSate to []
    const [outsideTemperature, setOutsideTemperature] = useState(39);
    const [insideTemperature, setInsideTemperature] = useState(29);

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
                            return val + " °C"; // "°C"
                        },
                    },
                },
            },
        },
        fill: {
            colors: ['#52b69a', '#b5e48c'], // colors inside, outside
        },
        labels: ['Inside', 'Outside']
    };

    useEffect(() => {
        // Fetch OUTISDE temperature data
        axios.get('/api/getWeather')
            .then(response => {
                const data = response.data;
                setOutsideTemperature(data.temperatureValue); // change for getWeather type name
            })
            .catch(error => {
                console.error('Error fetching outside temperature:', error);
            });

        // Fetch INSIDE temperature data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                const data = response.data;
                setInsideTemperature(data.temperatureValue);
            })
            .catch(error => {
                console.error('Error fetching inside temperature:', error);
            });
    }, []);

    return (
        <div>
            <ApexCharts options={options} series={options.series} type="radialBar" height={180} />
        </div>
    );
};

export default HumidityChart;

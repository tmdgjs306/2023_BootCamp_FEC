import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const HumidityChart = () => {
    // need to change useSate to []
    const [outsideHumidity, setOutsideHumidity] = useState(39);
    const [insideHumidity, setInsideHumidity] = useState(29);

    const options = {
        chart: {
            height: 180,
            type: 'radialBar',
        },
        series: [outsideHumidity, insideHumidity],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        formatter: function (val) {
                            return val + "%";
                        },
                    },
                },
            },
        },
        fill: {
            colors: ['#14213d', '#4c7de7'], // colors inside, outside
        },
        labels: ['Outside', 'Inside']
    };

    const fetchData = () => {
        // Fetch OUTISDE humidity data
        axios.get('/api/getWeather')
            .then(response => {
                const { humidityValue } = response.data;
                setOutsideHumidity(humidityValue); // change for getWeather type name
            })
            .catch(error => {
                console.error('Error fetching outside humidity:', error);
            });

        // Fetch INSIDE humidity data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                const data = response.data;
                setInsideHumidity(data.humidityValue);
            })
            .catch(error => {
                console.error('Error fetching inside humidity:', error);
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
        <div>
            <ApexCharts options={options} series={options.series} type="radialBar" height={180} />
        </div>
    );
};

export default HumidityChart;

import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const HumidityChart = () => {
    // need to change useSate to []
    const [outsideHumidity, setOutsideHumidity] = useState([]);
    const [insideHumidity, setInsideHumidity] = useState([]);

    const options = {
        chart: {
            height: 280,
            type: 'radialBar',
        },
        series: [insideHumidity, outsideHumidity],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        formatter: function (val) {
                            return val + " %";
                        },
                    },
                },
            },
        },
        fill: {
            colors: ['#bbadff', '#4361ee'], // Set colors inside, outside
        },
        labels: ['Inside', 'Outside']
    };

    useEffect(() => {
        // Fetch outside humidity data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                //const { humidityValue } = response.data
                let String = JSON.stringify(response.data);
                setOutsideHumidity(JSON.parse(String).humidityValue);
            })
            .catch(error => {
                console.error('Error fetching outside humidity:', error);
            });

        // Fetch inside humidity data
        axios.get('/api/latestEnvironmentData')
            .then(response => {
                let String = JSON.stringify(response.data);
                setInsideHumidity(JSON.parse(String).humidityValue);
            })
            .catch(error => {
                console.error('Error fetching inside humidity:', error);
            });
    }, []);

    return (
        <div>
            <ApexCharts options={options} series={options.series} type="radialBar" height={280} />
        </div>
    );
};

export default HumidityChart;

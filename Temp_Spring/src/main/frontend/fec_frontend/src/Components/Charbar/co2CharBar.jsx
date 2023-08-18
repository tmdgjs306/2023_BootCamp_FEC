import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const CO2Chart = () => {
    // need to change useSate to []
    const [co2Data, setCO2Data] = useState(300);

    const getColor = value => {
        if (value >= 0 && value <= 100) {
            return '#ffff3f'; // too low
        } else if (value > 100 && value <= 900) {
            return '#bfd200'; // good
        } else if (value > 900 && value <= 2000) {
            return '#2b9348'; // perfect
        }
    };

    const options = {
        chart: {
            height: 280,
            type: 'radialBar',
        },
        series: [co2Data],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        formatter: function (val) {
                            return val + " ppm"; // ppm unit
                        },
                    },
                },
                max: 5000, // Set the maximum value
            },
        },
        fill: {
            colors: [getColor(co2Data)], // color function 
        },
        labels: ['CO2 Level']
    };

    useEffect(() => {
        // Fetch live CO2 data
        axios.get('/latestEnvironmentData')
            .then(response => {
                const { carbonDioxideValue } = response.data;
                setCO2Data(carbonDioxideValue);
            })
            .catch(error => {
                console.error('Error fetching CO2 data:', error);
            });
    }, []);

    return (
        <div>

            <ApexCharts options={options} series={options.series} type="radialBar" height={280} />
        </div>
    );
};

export default CO2Chart;

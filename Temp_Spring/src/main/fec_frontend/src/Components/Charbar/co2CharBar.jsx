import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const CO2Chart = () => {
    // need to change useSate to []
    const [co2Data, setCO2Data] = useState(23);

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
            height: 180,
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
                max: 10000, // Set the maximum value
            },
        },
        fill: {
            colors: [getColor(co2Data)], // color function
        },
        labels: ['CO2 Level']
    };
    const fetchData = () => {
        // Fetch live CO2 data
        const res = axios.get('/api/latestEnvironmentData')
            .then(response => {
                let String = JSON.stringify(response.data);
                setCO2Data(JSON.parse(String).carbonDioxideValue);
            })
            .catch(error => {
                console.error('Error fetching CO2 data:', error);
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

export default CO2Chart;

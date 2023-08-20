import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const ChartComponent = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 180,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    series: [],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: []
    }
  });

  const fetchData = (sensorType) => {
    axios.get("/api/latestEnvironmentData")
      .then(response => {
        const jsonString = JSON.stringify(response.data);
        const sensorData = JSON.parse(jsonString)[sensorType];

        // Convert the received sensor data into an array of numbers
        const numericData = sensorData.map(item => parseFloat(item));

        setChartOptions({
          ...chartOptions,
          series: [{ name: sensorType, data: numericData }],
          xaxis: { categories: numericData.map((_, index) => index + 1) }
        });
      })
      .catch(error => {
        console.error("Error fetching sensor data:", error);
      });
  };

  useEffect(() => {
    // Fetch initial data
    fetchData("temperatureValue");

    // Set up interval to refresh data every 10 seconds
    const intervalId = setInterval(() => {
      fetchData("temperatureValue"); // Change the sensorType as needed
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="chart">
        <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={180} />
      </div>
      <div className="flex space-x-2">
        <button
          className="bg-[#1982c4] hover:bg-blue-800 text-white px-4 py-2 rounded"
          onClick={() => fetchData("temperatureValue")}
        >
          Temperature
        </button>
        <button
          className="bg-[#8ac926] hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => fetchData("humidityValue")}
        >
          Humidity
        </button>
        <button
          className="bg-[#ff595e] hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => fetchData("carbonDioxideValue")}
        >
          CO2
        </button>
      </div>
    </div>
  );
};

export default ChartComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sunny from '../../Assets/sunny.png';
import Cloudy from '../../Assets/cloudy.png';
import Rainy from '../../Assets/rainy.png';
import Snowy from '../../Assets/snowy.png';

const WeatherOverview = () => {
    const weatherIllustrations = {
        sunny: Sunny,
        cloudy: Cloudy,
        rainy: Rainy,
        snowy: Snowy,
    };
    const [humidity, setHumidity] = useState('89');
    const [temperature, setTemperature] = useState('30');
    const [weatherStatus, setWeatherStatus] = useState('sunny');

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/getWeather');

            const { temperatureValue, humidityValue, weatherStatus } = response.data;

            setTemperature(temperatureValue);
            setHumidity(humidityValue);
            setWeatherStatus(weatherStatus);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // Fetch new data every 10 seconds
        const interval = setInterval(fetchData, 10000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const weatherIllustration = weatherIllustrations[weatherStatus];

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Weather Overview</h2>
            <div className="flex items-center">
                <div className="mr-4">
                    <img
                        src={weatherIllustration}
                        alt="Weather Illustration"
                        className="h-16 w-16 transition-transform transform hover:scale-110"
                    />
                </div>
                <div>
                    <p>Temperature: {temperature}°C</p>
                    <p>Humidity: {humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherOverview;

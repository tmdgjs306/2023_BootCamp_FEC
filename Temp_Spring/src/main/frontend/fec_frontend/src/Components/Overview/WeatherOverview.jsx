import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherOverview = () => {
    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        humidity: 0,
        weatherCondition: 'sunny', // Initialize with a default condition
    });

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get('/api/getWeather');
            const { temperature, humidity, condition } = response.data;

            // Update the state with fetched weather data
            setWeatherData({
                temperature,
                humidity,
                weatherCondition: condition,
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const weatherIllustration = `${weatherData.weatherCondition}.png`;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Weather Overview</h2>
            <div className="flex items-center">
                <div className="mr-4">
                    <img
                        src={`/${weatherIllustration}`} // Assuming your images are located in the public folder
                        alt="Weather Illustration"
                        className="h-16 w-16"
                    />
                </div>
                <div>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherOverview;

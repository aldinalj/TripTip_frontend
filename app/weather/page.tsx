"use client"

import React, { useState } from "react";
import Navbar from "../_components/Navbar";
import { IWeather } from "../_types/IWeather";
import LogInToAccess from "../_components/LogInToAccess";

const WeatherPage: React.FC = () => {
    const [city, setCity] = useState<string>("Stockholm");
    const [weather, setWeather] = useState<IWeather | null>(null);
    const [error, setError] = useState<string>("");
    const token = sessionStorage.getItem("authToken");

    const fetchWeather = async (city: string) => {
        try {
            const response = await fetch(
                `http://localhost:8080/weather/current?city=${city}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }

            const data: IWeather = await response.json();  
            setWeather(data);
        } catch (err) {
            setError("Failed to fetch weather. Please try again.");
        }
    };

    const handleSearch = () => {
        fetchWeather(city);
    };

    return (
        <main>
    <Navbar />
    {token ? (
    <div className="max-w-sm mx-auto p-6 bg-cyan-700 shadow-md rounded-lg mt-10">
        <h1 className="text-xl font-bold text-center text-white mb-6">
            Weather Information
        </h1>
        <div className="space-y-4">
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-white">
                    City
                </label>
                <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter City"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                />
            </div>
            <button
                onClick={handleSearch}
                className="w-full bg-cyan-500 text-white py-3 px-4 rounded-md shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
                Get Weather
            </button>
        </div>

        {weather && weather.data.length > 0 && (
            <div className="mt-6 p-4 bg-cyan-600 rounded-md">
                <h2 className="text-lg font-semibold text-white">Weather Details</h2>
                <p className="mt-2 text-white">
                    <strong>City:</strong> {weather.data[0].city_name}, {weather.data[0].country_code}
                </p>
                <p className="mt-2 text-white">
                    <strong>Temperature:</strong> {weather.data[0].temp}°C
                </p>
                <p className="mt-2 text-white">
                    <strong>Apparent Temperature:</strong> {weather.data[0].app_temp}°C
                </p>
                <p className="mt-2 text-white">
                    <strong>Humidity:</strong> {weather.data[0].rh}%
                </p>
                <p className="mt-2 text-white">
                    <strong>Wind Speed:</strong> {weather.data[0].wind_spd} m/s
                </p>
                <p className="mt-2 text-white">
                    <strong>Cloud Coverage:</strong> {weather.data[0].clouds}%
                </p>
                <p className="mt-2 text-white">
                    <strong>UV Index:</strong> {weather.data[0].uv}
                </p>
                <p className="mt-2 text-white">
                    <strong>Wind Direction:</strong> {weather.data[0].wind_dir}° 
                </p>
                <p className="mt-2 text-white">
                    <strong>Wind Gust:</strong> {weather.data[0].gust} m/s
                </p>
                <p className="mt-2 text-white">
                    <strong>Part of Day:</strong> {weather.data[0].pod}
                </p>
                <p className="mt-2 text-white">
                    <strong>Weather Condition:</strong> {weather.data[0].weather.description}
                </p>
                <p className="mt-2 text-white">
                    <strong>Visibility:</strong> {weather.data[0].vis} km
                </p>
                <p className="mt-2 text-white">
                    <strong>Snowfall:</strong> {weather.data[0].snow} mm
                </p>
                <p className="mt-2 text-white">
                    <strong>Sunrise:</strong> {weather.data[0].sunrise}
                </p>
                <p className="mt-2 text-white">
                    <strong>Sunset:</strong> {weather.data[0].sunset}
                </p>
                <p className="mt-2 text-white">
                    <strong>Timezone:</strong> {weather.data[0].timezone}
                </p>
            </div>
        )}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
    ) : (
        <LogInToAccess />
      )}
</main>
    );
};

export default WeatherPage;
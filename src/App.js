import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// URL de l'API pour les prévisions météo
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function Grp204WeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
    const [forecast, setForecast] = useState([]); // État pour stocker les prévisions météo

    const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

    // Fonction pour récupérer les prévisions météo
    const getForecast = async (city) => {
        try {
            const response = await axios.get(forecastUrl, {
                params: {
                    q: city,
                    units: 'metric',
                    appid: apiKey,
                },
            });

            // Filtrer les prévisions pour obtenir une entrée par jour (12:00 UTC)
            const dailyForecast = response.data.list.filter((item) =>
                item.dt_txt.includes('12:00:00')
            );

            setForecast(dailyForecast);
        } catch (error) {
            console.error('Erreur lors de la récupération des prévisions :', error);
        }
    };

    // Fonction de recherche pour obtenir les données météo actuelles et les prévisions
    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });

            const url = 'https://api.openweathermap.org/data/2.5/weather';
            try {
                const res = await axios.get(url, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: apiKey,
                    },
                });

                setWeather({ data: res.data, loading: false, error: false });
                await getForecast(input); // Récupérer les prévisions après la recherche
            } catch (error) {
                setWeather({ ...weather, data: {}, error: true });
                setInput('');
            }
        }
    };

    return (
        <div className="App">
            <h1 className="app-name">Application Météo grp204</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Entrez le nom de la ville..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={search}
                />
            </div>

            {weather.error && <p className="error-message">Ville introuvable</p>}

            {weather.data && weather.data.main && (
                <div className="weather-info">
                    <h2>{weather.data.name}, {weather.data.sys.country}</h2>
                    <p>Température : {Math.round(weather.data.main.temp)}°C</p>
                    <p>Vitesse du vent : {weather.data.wind.speed} m/s</p>
                </div>
            )}

            {/* Affichage des prévisions sur 5 jours */}
            {forecast.length > 0 && (
                <div className="forecast">
                    <h3>Prévisions sur 5 jours</h3>
                    <div className="forecast-items">
                        {forecast.map((day) => (
                            <div key={day.dt} className="forecast-item">
                                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                />
                                <p>{Math.round(day.main.temp)}°C</p>
                                <p>{day.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grp204WeatherApp;

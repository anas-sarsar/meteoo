import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function WeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({ loading: false, data: {}, error: false });

    const searchWeather = async (event) => {
        if (event.key === 'Enter') {
            setWeather({ ...weather, loading: true });
            const apiKey = 'VOTRE_API_KEY';
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            try {
                const response = await axios.get(url, {
                    params: { q: input, units: 'metric', appid: apiKey },
                });
                setWeather({ data: response.data, loading: false, error: false });
            } catch (error) {
                setWeather({ data: {}, loading: false, error: true });
            }
        }
    };

    return (
        <div className="App">
            <h1>Application Météo</h1>
            <input
                type="text"
                placeholder="Entrez le nom de la ville..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={searchWeather}
            />
            {weather.loading && <Oval color="black" height={100} width={100} />}
            {weather.error && <p>Ville introuvable</p>}
            {weather.data.main && (
                <div>
                    <h2>{weather.data.name}, {weather.data.sys.country}</h2>
                    <p>{Math.round(weather.data.main.temp)}°C</p>
                    <p>Vitesse du vent : {weather.data.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
<<<<<<< HEAD

=======
>>>>>>> f70a1b2 (Initialisation de l'application météo)

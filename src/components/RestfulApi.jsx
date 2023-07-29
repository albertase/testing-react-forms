import React, { useState, useEffect } from 'react';

const RestfulApi = () => {
  const [cities, setCities] = useState([]);
  const apiKey = 'fed230a6e88686';

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/json?token=${apiKey}`);
      const data = await response.json();

      // Extract the city name from the API response and set it in the state
      const cityName = data.city || '';
      setCities([cityName]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>City: {cities[0]}</h2>
      <select name="city" id="city">
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RestfulApi;

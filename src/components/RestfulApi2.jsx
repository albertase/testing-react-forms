import React, { useState } from 'react';
import { Country, State, City } from 'country-state-city';

const RestfulApi2 = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (event) => {
    const countryIsoCode = event.target.value;
    setSelectedCountry(countryIsoCode);
    setSelectedState('');
    setSelectedCity('');

    // Get states of the selected country
    const countryStates = State.getStatesOfCountry(countryIsoCode);
    setStates(countryStates);
    setCities([]);
  };

  const handleStateChange = (event) => {
    const stateIsoCode = event.target.value;
    setSelectedState(stateIsoCode);
    setSelectedCity('');

    // Get cities of the selected state
    const stateCities = City.getCitiesOfState(selectedCountry, stateIsoCode);
    setCities(stateCities);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const countries = Country.getAllCountries();

  return (
    <div>
      <div>
        <label htmlFor="country">Country</label>
        <select name="country" id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value=""></option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="state">State</label>
        <select name="state" id="state" value={selectedState} onChange={handleStateChange}>
          <option value=""></option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city">City</label>
        <select name="city" id="city" value={selectedCity} onChange={handleCityChange}>
          <option value=""></option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RestfulApi2;

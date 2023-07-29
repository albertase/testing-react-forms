import React, { useState } from 'react';
import { Country, City } from 'country-state-city';
import FlagsSelect from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';
import Select from 'react-select';

const RestfulApi2 = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setSelectedCity('');

    // Get cities of the selected country
    const countryCities = City.getCitiesOfCountry(countryCode);
    setCities(countryCities);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption ? selectedOption.value : '');
  };

  const countries = Country.getAllCountries();
  const cityOptions = cities.map((city) => ({ value: city.name, label: city.name }));

  return (
    <div>
      <div>
        <label htmlFor="country">Country</label>
        <FlagsSelect
          className="country-select"
          countries={countries.map((country) => country.isoCode)}
          onSelect={(countryCode) => handleCountryChange(countryCode)}
          selected={selectedCountry}
          searchable={true}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <Select
          options={cityOptions}
          value={cityOptions.find((option) => option.value === selectedCity)}
          onChange={handleCityChange}
          isSearchable={true}
        />
      </div>
    </div>
  );
};

export default RestfulApi2;

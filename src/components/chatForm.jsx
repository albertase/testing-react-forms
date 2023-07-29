import React, { useState, useEffect } from 'react';
import Select from 'react-flags-select';
import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './chatForm.css';
import axios from 'axios';

const ChatForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    country: '',
    // city: '',
    phoneNumber: '',
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch country data from the "restcountries" API
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryData = response.data.map((country) => ({
          label: country.name.common,
          value: country.cca2,
          code: `+${country.callingCodes[0]}`,
        }));
        setCountries(countryData);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Fetch city data based on the selected country
    if (formData.country !== '') {
      axios
        .get(`https://city-api.example.com/cities/${formData.country}`)
        .then((response) => {
          const cityData = response.data.map((city) => city.name);
          setCities(cityData);
        })
        .catch((error) => console.log(error));
    }
  }, [formData.country]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleCountrySelect = (countryCode) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: countryCode,
      city: '',
    }));
  };

  const handlePhoneNumberChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: formattedPhoneNumber,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation logic
    if (formData.name.trim() === '') {
      console.log('Please enter your name.');
      return;
    }

    if (formData.email.trim() === '') {
      console.log('Please enter your email.');
      return;
    }

    if (formData.gender === '') {
      console.log('Please select your gender.');
      return;
    }

    if (formData.country === '') {
      console.log('Please select your country.');
      return;
    }

    // if (formData.city === '') {
    //   console.log('Please select your city.');
    //   return;
    // }

    if (formData.phoneNumber.trim() === '') {
      console.log('Please enter your phone number.');
      return;
    }

    // Form submission to server
    console.log('Form submitted:', formData);
    // Add your server submission logic here

    // Reset the form
    setFormData({
      name: '',
      email: '',
      gender: '',
      country: '',
      city: '',
      phoneNumber: '',
    });
  };

  return (
    <div className="chat-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Your E-Mail</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <Select
            id="country"
            searchable
            options={countries}
            selected={formData.country}
            onSelect={handleCountrySelect}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!formData.country}
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <PhoneInput
            id="phoneNumber"
            defaultCountry="US"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            countrySelectComponent={({ selectedCountry }) => (
              <div>{selectedCountry ? selectedCountry.code : null}</div>
            )}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
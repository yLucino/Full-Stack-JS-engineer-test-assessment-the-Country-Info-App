import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/countryList.css'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const axiosCountries = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error when searching for list of countries:', error);
      }
    };

    axiosCountries();
  });

  return (
    <div className='home-list-countries'>
      <h1>List of Countries:</h1>
      <ul className='container-of-country'>
        {countries && countries.length > 0 ? (
          countries.map((country) => (
            <li className='country' key={country.countryCode}>
              <Link to={`/country-info/${country.countryCode}`}>
                {country.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No countries available.</p>
        )}
      </ul>
    </div>
  )
}

export default CountryList;
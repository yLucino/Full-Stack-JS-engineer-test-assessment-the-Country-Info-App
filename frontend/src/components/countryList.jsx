import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error('Erro ao buscar lista de países:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
    <h1>List of Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link to={`/country-info/${country.countryCode}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CountryList;
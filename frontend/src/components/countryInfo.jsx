import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PopulationChart from './PopulationChart';
import axios from 'axios';
import '../styles/countryInfo.css'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CountryInfo = () => {
  const {countryCode} = useParams();  
  const [infos, setInfos] = useState({ commonName: '', borders: [] });
  const [flag, setFlag] = useState([]);
  const [filterFlag, setFilterFlag] = useState(null);
  const [population, setPopulation] = useState([]);
  const [filterPopulation, setFilterPopulation] = useState(null);


  useEffect(() => {
    const axiosInfos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/country-info/${countryCode}`);
        setInfos(response.data);
      } catch (error) {
        console.error('Error when searching for list of Infos:', error);
      }
    }
    axiosInfos();
  }, [countryCode]);

  useEffect(() => {
    const axiosFlags = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/flag-images`);
        setFlag(response.data);
      } catch (error) {
        console.error('Error when searching for list of Flags:', error);
      }
    }
    axiosFlags();
  }, []);

  useEffect(() => {
    if (infos.commonName && flag.data) {
      const filtered = flag.data.find(item => item.name === infos.commonName);
      setFilterFlag(filtered || null);
    }
  }, [infos, flag]);

  useEffect(() => {
    const axiosPopulation = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/population`);
        setPopulation(response.data);
      } catch (error) {
        console.error('Error when searching for list of Population:', error);
      }
    }
    axiosPopulation();
  }, []);

  useEffect(() => {
    if (infos.commonName && population.data) {
      const filtered = population.data.find(item => item.country === infos.commonName);
      setFilterPopulation(filtered || null);
    }
  }, [infos, population]);
  
  return (
    <div className='page-country-info'>
      <h1>Detailed Country Information</h1>
      <div className='title-country'>
        <h2>{infos.commonName}</h2>
        {filterFlag && filterFlag.flag ? (
          <img src={filterFlag.flag} alt={filterFlag.name} />
        ) : (
          <p>No flag available.</p>
        )}
      </div>
      <div className='borders'>
        <h3>Countries that border {infos.commonName}:</h3>
        <ul>
          {infos.borders && infos.borders.length > 0 ? (
            infos.borders.map((info) => (
              <li key={info.countryCode}>
                <Link to={`/country-info/${info.countryCode}`}>
                  {info.commonName}
                </Link>
              </li>
            ))
          ) : (
            <p>No bordering countries available.</p>
          )}
        </ul>
      </div>
      <div className='population-Chart'>
        <h3>{infos.commonName} Population Chart</h3>
        {filterPopulation ? (
          <PopulationChart data={filterPopulation.populationCounts} />
        ) : (
          <p>No population data available.</p>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
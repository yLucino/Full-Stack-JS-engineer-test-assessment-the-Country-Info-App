import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import axios from 'axios';

const PORT = process.env.PORT;
const NAGER_API_BASE_URL = process.env.NAGER_API_BASE_URL;
const COUNTRIES_API_BASE_URL = process.env.COUNTRIES_API_BASE_URL;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get(`${NAGER_API_BASE_URL}/AvailableCountries`);
    const countries = response.data;
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/country-info/:countryCode', async (req, res) => {
  const countryCode = req.params.countryCode
  try {
    const response = await axios.get(`${NAGER_API_BASE_URL}/CountryInfo/${countryCode}`);
    const countries = response.data;
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/population', async (req, res) => {
  try {
    const response = await axios.get(`${COUNTRIES_API_BASE_URL}/countries/population`);
    const countries = response.data;
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/flag-images', async (req, res) => {
  try {
    const response = await axios.get(`${COUNTRIES_API_BASE_URL}/countries/flag/images`);
    const countries = response.data;
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
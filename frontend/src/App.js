import CountryList from './components/countryList';
import CountryInfo from './components/CountryInfo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country-info/:countryCode" element={<CountryInfo />} />  
      </Routes> 
    </Router>
  );
}

export default App;

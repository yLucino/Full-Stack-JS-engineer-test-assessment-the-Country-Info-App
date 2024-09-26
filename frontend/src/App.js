import CountryList from './components/CountryList.jsx';
import CountryInfo from './components/CountryInfo.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact component={CountryList} />  
        <Route path="/country-info/:countryCode" component={CountryInfo}/>  
      </Routes> 
    </Router>
  );
}

export default App;

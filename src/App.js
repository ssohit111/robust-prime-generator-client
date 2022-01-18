import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import PrimeGenerator from './components/PrimeGenerator';
import PrintPrimes from './components/PrintPrimes';
function App() {
  return (
    <Router className="myclass">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/primegenerator" element={<PrimeGenerator />} />
        <Route path='/primegenerator/:Low/:High/:Choice' element={<PrintPrimes />} />
      </Routes>
    </Router>
  );
}

export default App;
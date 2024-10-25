import './App.css';
import Navbar from './components/NavBar';
import Availabledata from './routes/Availabledata';
import Home from './routes/Home';
import Ruledata from './routes/Ruledata'
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/availabledata" element={<Availabledata/>}/>
      <Route path="/datarule" element={<Ruledata/>}/>

     </Routes>
    </div>
  );
}


export default App;

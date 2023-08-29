import './App.css';
import Registration from './Components/Registration';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;

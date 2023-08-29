import './App.css';
import Registration from './Components/Registration';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Registration />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;

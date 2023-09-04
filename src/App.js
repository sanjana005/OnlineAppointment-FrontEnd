import './App.css';
import Registration from './Components/Registration';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import UserDashboard from './Components/UserDashboard';
import ViewConsultants from './Components/ViewConsultants';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Registration' element={<Registration />} />
          <Route path='/' element={<Login />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/ViewConsultants' element={<ViewConsultants />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;

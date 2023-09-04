import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserNavbar() {
  const navigate = useNavigate();

  const tabStyle = {
    color: 'black',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };

  const handleTabHover = (e) => {
    e.target.style.color = 'blue';
  };

  const handleTabLeave = (e) => {
    e.target.style.color = 'black'; 
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    navigate('/');
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        THE JOB
      </a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link to="/UserDashboard" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              My Appointments
            </Link>
        </li>
        <li class="nav-item">
        <Link to="/ViewConsultants" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              Consultants
            </Link>
        </li>
      </ul>
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
    </div>
    </div>
  </nav>
  );
}

export default UserNavbar;

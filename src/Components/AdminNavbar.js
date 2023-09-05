import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminNavbar() {
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
        <Link to="/ManageUser" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              User
            </Link>
        </li>
        <li class="nav-item">
        <Link to="/ManageConsultant" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              Consultant
            </Link>
        </li>
        <li class="nav-item">
        <Link to="/ConsultantAppointments" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              Appointment
            </Link>
        </li>
        <li class="nav-item">
        <Link to="/ConsultantAppointments" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              Schedules
            </Link>
        </li>
        <li class="nav-item">
        <Link to="/ConsultantAppointments" class="nav-link" style={tabStyle} onMouseEnter={handleTabHover} onMouseLeave={handleTabLeave}>
              Reports
            </Link>
        </li>
      </ul>
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
    </div>
    </div>
  </nav>
  );
}

export default AdminNavbar;

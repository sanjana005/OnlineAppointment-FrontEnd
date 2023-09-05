import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConsultantNavbar from './ConsultantNavbar';

function ConsultantAppointments() {
    const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");

    try {
      const response = await axios.post('https://localhost:44312/api/Appointment/AppointmentList', {
        Type: 'Consultant',
        Date: '',
        Time: '',
        CName: '',
        UName: '',
        CEmail: loggedInEmail,
        UEmail: '',
        Country: ''
      });

      setAppointments(response.data.listAppointment || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <ConsultantNavbar />
      <div className="consultants shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-12 mt-5 mb-4 text-gred">
            <h2 style={{ color: "green" }}><b>Your Appointments</b></h2>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>App.No</th>
                  <th>Job Applicant</th>
                  <th>Applicant Email</th>
                  <th>Country</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Is Approved</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{appointment.appNo}</td>
                    <td>{appointment.uName}</td>
                    <td>{appointment.uEmail}</td>
                    <td>{appointment.country}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.isApproved === 0 ? "No" : "Yes"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultantAppointments;

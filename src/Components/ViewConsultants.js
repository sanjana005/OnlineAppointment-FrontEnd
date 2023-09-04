import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';

function ViewConsultants() {
  const [consultants, setConsultants] = useState([]);

  const fetchConsultants = async () => {
    try {
      const response = await axios.get('https://localhost:44312/api/Consultant/ConsultantList',);
      setConsultants(response.data.listCRegistration || []);
    } catch (error) {
      console.error('Error fetching consultant data:', error);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  return (
    <div className="container">
      <UserNavbar />
      <div className="consultants shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-12 mt-5 mb-4 text-gred">
            <h2 style={{ color: "green" }}><b>Consultants Availability</b></h2>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Consultant Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Date</th>
                  <th>Time From</th>
                  <th>Time To</th>
                  <th>Contact No</th>
                </tr>
              </thead>
              <tbody>
                {consultants.map((consultant, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{consultant.id}</td>
                    <td>{consultant.name}</td>
                    <td>{consultant.email}</td>
                    <td>{consultant.country}</td>
                    <td>{consultant.date}</td>
                    <td>{consultant.time}</td>
                    <td>{consultant.to_Time}</td>
                    <td>{consultant.contact}</td>
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

export default ViewConsultants;

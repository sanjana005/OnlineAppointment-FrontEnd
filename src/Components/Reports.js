import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";

function Reports() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('https://localhost:44312/api/Reports/ReportsList',);
      setReports(response.data.listReports || []);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="container">
      <AdminNavbar />
      <div className="consultants shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-12 mt-5 mb-4 text-gred">
            <h2 style={{ color: "green" }}><b>Reports List</b></h2>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>App.No</th>
                  <th>Applicant Name</th>
                  <th>Consultant Name</th>
                  <th>Country</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Is Approved</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{report.appNo}</td>
                    <td>{report.uName}</td>
                    <td>{report.cName}</td>
                    <td>{report.country}</td>
                    <td>{report.date}</td>
                    <td>{report.time}</td>
                    <td>{report.isApproved === 0 ? "No" : "Yes"}</td>
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

export default Reports;

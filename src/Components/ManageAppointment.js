import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";
 
function ManageAppointment() {
    
    const [appointments, setAppointments] = useState([]);
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState('');
    const [consultantName, setConsultantName] = useState('');
    const [consultantEmail, setConsultantEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isApproved, setIsApproved] = useState(false);
    const [deleteAppointmentNo, setDeleteAppointmentNo] = useState(null);
    const [editAppointment, setEditAppointment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const handleClose = () => {
        setShow(false); 
        setDeleteAppointmentNo(null); 
        setEditAppointment(null);
    };
    const handleShow = () => setShow(true);

    const fetchData = async () => {
    
        try {
          const response = await axios.post('https://localhost:44312/api/Appointment/AppointmentList', {
            Type: 'Admin',
            Date: '',
            Time: '',
            CName: '',
            UName: '',
            CEmail: '',
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

      const handleAddAppointment = async (e) => {
        e.preventDefault();
        
        
        try {
          const response = await axios.post('https://localhost:44312/api/Appointment/MakeAppointment', {
            Type: '',
            UName: userName,
            CName: consultantName,
            CEmail: consultantEmail,
            UEmail: userEmail,
            Country: country,
            Date: date,
            Time: time,
             
          });

          handleClose();

          fetchData();
          
          setUserName('');
          setConsultantName('');
          setConsultantEmail('');
          setUserEmail('');
          setCountry('');
          setDate('');
          setTime('');

          const dt = response.data;
          alert(dt.statusMessage);

        } catch (error) {
          console.error('Error adding appointment:', error);
        }
      };

      const handleDeleteAppointment = async (appNo) => {

        if (!appNo){ 
          console.log("No appointment to delete.");
            return};
            
        try {

          alert("Are Sure?");
          
          const response = await axios.delete('https://localhost:44312/api/Appointment/AppointmentDelete', {
            data: { AppNo: appNo,
                    Type: '',
                    UName: '',
                    CName: '',
                    CEmail: '',
                    UEmail: '',
                    Country: '',
                    Date: '',
                    Time: '',
                },
          });

          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.appNo !== appNo
            )
          );
  

        } catch (error) {
          console.error("Error deleting appointment:", error);
        }
      };

      const handleEditAppointment = (appointment) => {
        setEditAppointment(appointment);
        setIsEditing(true);
        //setIsApproved(appointment.isApproved);
        handleShow();
      };

      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditAppointment((prevAppointment) => ({
          ...prevAppointment,
          [name]: name === 'isApproved' ? value === 'true' : value,
        }));
      };

      const handleUpdateAppointment = async (e) => {
        e.preventDefault();

        console.log('Before update - isApproved:', isApproved);

        try {
          const updatedData = {
            Type: '',
            AppNo: editAppointment.appNo,
            UName: editAppointment.uName,
            CName: editAppointment.cName,
            CEmail: editAppointment.cEmail,
            UEmail: editAppointment.uEmail,
            Country: editAppointment.country,
            Date: editAppointment.date,
            Time: editAppointment.time,
            IsApproved: editAppointment.isApproved ? 1 : 0,
          };
      
          const response = await axios.put(
            'https://localhost:44312/api/Appointment/AppointmentUpdate',
            updatedData
          );

          console.log('After update - isApproved:', updatedData.IsApproved);
      
          const updatedAppointment = response.data;
          const updatedAppointments = appointments.map((appointment) =>
            appointment.appNo === updatedAppointment.appNo ? updatedAppointment : appointment
          );
      
          setAppointments(updatedAppointments);
          handleClose(); 
          setIsEditing(false);
      
          const dt = response.data;
          alert(dt.statusMessage);

          fetchData();

        } catch (error) {
          console.error('Error updating appointment:', error);
        }
      };

  return (
 
       <div class="container ">
        <AdminNavbar />
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div class="row ">
           
           <div class="col-sm-3 mt-5 mb-4 text-gred">
              {/* <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search"/>
                
                </form>
              </div>     */}
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Manage Appointments</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Make Appointment
              </Button>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>App.No</th>
                            <th>Job Applicant </th>
                            <th>Email</th>
                            <th>Consultant </th>
                            <th>Consultant Email </th>
                            <th>Country </th>
                            <th>Date </th>
                            <th>Time </th>
                            <th>Is Approved</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment, index) => (                   
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{appointment.appNo}</td>
                            <td>{appointment.uName}</td>
                            <td>{appointment.uEmail}</td>
                            <td>{appointment.cName}</td>
                            <td>{appointment.cEmail}</td>
                            <td>{appointment.country}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.isApproved === 0 ? "No" : "Yes"}</td>
                            <td>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEditAppointment(appointment)}><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}} onClick={() => handleDeleteAppointment(appointment.appNo)}><i class="material-icons">&#xE872;</i></a>
                                 
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>   
        </div>  
 
        {/* <!--- Model Box ---> */}
        <div className="model_box">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>{editAppointment ? 'Edit Appointment' : 'Make Appointment'}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="txtUName" name="uName" aria-describedby="emailHelp" placeholder="Enter Job Applicant Name"
                    value={editAppointment ? editAppointment.uName : userName} onChange={(e) => (editAppointment ? handleEditChange(e) : setUserName(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="txtUEmail" name="uEmail" aria-describedby="emailHelp" placeholder="Enter Applicant Email"
                    value={editAppointment ? editAppointment.uEmail : userEmail} onChange={(e) => (editAppointment ? handleEditChange(e) : setUserEmail(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" id="txtCName" name="cName" aria-describedby="emailHelp" placeholder="Enter Consultant Name" 
                    value={editAppointment ? editAppointment.cName : consultantName} onChange={(e) => (editAppointment ? handleEditChange(e) : setConsultantName(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="txtCEmail" name="cEmail" aria-describedby="emailHelp" placeholder="Enter Consultant Email"
                    value={editAppointment ? editAppointment.cEmail : consultantEmail} onChange={(e) => (editAppointment ? handleEditChange(e) : setConsultantEmail(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" id="txtCountry" name="country" aria-describedby="emailHelp" placeholder="Enter Country"
                    value={editAppointment ? editAppointment.country : country} onChange={(e) => (editAppointment ? handleEditChange(e) : setCountry(e.target.value))} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtDate" name="date" placeholder="Date"
                    value={editAppointment ? editAppointment.date : date} onChange={(e) => (editAppointment ? handleEditChange(e) : setDate(e.target.value))} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtTime" name="time" placeholder="Time"
                    value={editAppointment ? editAppointment.time : time} onChange={(e) => (editAppointment ? handleEditChange(e) : setTime(e.target.value))} />
                </div>

                <div className="form-group mt-3">
                <label style={{ marginRight: '10px' }}>Approve:</label>
                <div className="form-check form-check-inline">
                <input
                    type="radio"
                    className="form-check-input"
                    id="approveYes"
                    name="isApproved"
                    value="true"
                    //checked={isApproved === true}
                    onChange={() => handleEditChange({ target: { name: 'isApproved', value: 'true' } })}
                />
                    <label className="form-check-label" htmlFor="approveYes">
                    Yes
                    </label>
                </div>
                <div className="form-check form-check-inline">
                <input
                    type="radio"
                    className="form-check-input"
                    id="approveNo"
                    name="isApproved"
                    value="false"
                    //checked={isApproved === false}
                    onChange={(e) => handleEditChange({ target: { name: 'isApproved', value: 'false' } })}
                />
                    <label className="form-check-label" htmlFor="approveNo">
                    No
                    </label>
                </div>
                </div>
                
                  <button type="button" class="btn btn-success mt-4" onClick={(e) => isEditing ? handleUpdateAppointment(e) : handleAddAppointment(e)}>
                  {isEditing ? 'Update Appointment' : 'Add Appointment'}
                    </button>
                </form>
            </Modal.Body>
 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
  
       {/* Model Box Finsihs */}
       </div>  
      </div>    
      </div>  
  );
}
 
export default ManageAppointment;
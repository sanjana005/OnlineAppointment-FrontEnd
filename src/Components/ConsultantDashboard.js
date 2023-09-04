import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConsultantNavbar from './ConsultantNavbar';
 
function ConsultantDashboard() {
    
    const [schedules, setSchedules] = useState([]);
    const [show, setShow] = useState(false);
    const [consultantName, setConsultantName] = useState('');
    const [consultantEmail, setConsultantEmail] = useState('');
    const [date, setDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [deleteScheduleId, setDeleteScheduleId] = useState(null);
    const [editSchedule, setEditSchedule] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const handleClose = () => {setShow(false); setDeleteScheduleId(null); setEditSchedule(null);};
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        const loggedInEmail = localStorage.getItem("loggedInEmail");
    
        try {
          const response = await axios.post('https://localhost:44312/api/ConsultantSchedule/ScheduleList', {
            Type: 'Consultant',
            Date: '',
            Time: '',
            To_Time: '',
            Name: '',
            Email: loggedInEmail
          });
    
          setSchedules(response.data.listSchedule || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const handleAddSchedule = async (e) => {
        e.preventDefault();
        
        const loggedInEmail = localStorage.getItem("loggedInEmail");
        
        try {
          const response = await axios.post('https://localhost:44312/api/ConsultantSchedule/AddSchedule', {
            Type: '',
            Name: consultantName,
            Email: loggedInEmail,
            Date: date,
            Time: timeFrom,
            To_Time: timeTo
          });

          handleClose();

          fetchData();
          
          setConsultantName('');
          setConsultantEmail('');
          setDate('');
          setTimeFrom('');
          setTimeTo('');

          const dt = response.data;
          alert(dt.statusMessage);

        } catch (error) {
          console.error('Error adding appointment:', error);
        }
      };

      const handleDeleteSchedule = async (id) => {

        if (!id){ 
          console.log("No time slot to delete.");
            return};
            
        try {

          alert("Are Sure?");
          
          const response = await axios.delete('https://localhost:44312/api/ConsultantSchedule/DeleteSchedule', {
            data: { id: id,
                    Type: '',
                    Name: '',
                    Email: '',
                    Date: '',
                    Time: '',
                    To_Time: ''
                },
          });

          setSchedules((prevSchedules) =>
          prevSchedules.filter(
              (schedule) => schedule.id !== id
            )
          );
  

        } catch (error) {
          console.error("Error deleting schedule:", error);
        }
      };

      const handleEditSchedule = (schedule) => {
        setEditSchedule(schedule);
        setIsEditing(true);
        handleShow();
      };

      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditSchedule((prevSchedule) => ({
          ...prevSchedule,
          [name]: value,
        }));
      };

      const handleUpdateSchedule = async (e) => {
        e.preventDefault();

        try {
          const updatedData = {
            Type: '',
            Id: editSchedule.id,
            Name: editSchedule.name,
            Email: editSchedule.email,
            Date: editSchedule.date,
            Time: editSchedule.time,
            To_Time: editSchedule.to_Time,
          };
      
          const response = await axios.put(
            'https://localhost:44312/api/ConsultantSchedule/ScheduleUpdate',
            updatedData
          );
      
          const updatedSchedule = response.data;
          const updatedSchedules = schedules.map((schedule) =>
            schedule.id === updatedSchedule.id ? updatedSchedule : schedule
          );
      
          setSchedules(updatedSchedules);
          handleClose(); 
          setIsEditing(false);
      
          const dt = response.data;
          alert(dt.statusMessage);

          fetchData();

        } catch (error) {
          console.error('Error updating schedule:', error);
        }
      };

  return (
 
       <div class="container ">
        <ConsultantNavbar />
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div class="row ">
           
           <div class="col-sm-3 mt-5 mb-4 text-gred">
              {/* <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search"/>
                
                </form>
              </div>     */}
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>My Time Slots</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add Time Slot
              </Button>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Schedule ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date </th>
                            <th>Time From</th>
                            <th>Time To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {schedules.map((schedule, index) => (                   
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{schedule.id}</td>
                            <td>{schedule.name}</td>
                            <td>{schedule.email}</td>
                            <td>{schedule.date}</td>
                            <td>{schedule.time}</td>
                            <td>{schedule.to_Time}</td>
                            <td>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEditSchedule(schedule)}><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}} onClick={() => handleDeleteSchedule(schedule.id)}><i class="material-icons">&#xE872;</i></a>
                                 
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
        <Modal.Title>{editSchedule ? 'Edit Time Slot' : 'Add Time Slot'}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div class="form-group">
                    <input type="txt" class="form-control" id="txtName" name="cname" placeholder="Enter Your Name"
                    value={editSchedule ? editSchedule.name : consultantName} onChange={(e) => (editSchedule ? handleEditChange(e) : setConsultantName(e.target.value))} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtDate" name="date" placeholder="Enter Available Date"
                    value={editSchedule ? editSchedule.date : date} onChange={(e) => (editSchedule ? handleEditChange(e) : setDate(e.target.value))} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtTimeFrom" name="time" placeholder="Enter In Time"
                    value={editSchedule ? editSchedule.time : timeFrom} onChange={(e) => (editSchedule ? handleEditChange(e) : setTimeFrom(e.target.value))} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtTimeTo" name="to_Time" placeholder="Enter Off Time"
                    value={editSchedule ? editSchedule.to_Time : timeTo} onChange={(e) => (editSchedule ? handleEditChange(e) : setTimeTo(e.target.value))} />
                </div>
                
                  <button type="button" class="btn btn-success mt-4" onClick={(e) => isEditing ? handleUpdateSchedule(e) : handleAddSchedule(e)}>
                  {isEditing ? 'Update Time Slot' : 'Add Time Slot'}
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
 
export default ConsultantDashboard;
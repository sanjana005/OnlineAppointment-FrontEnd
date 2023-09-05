import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";
 
function ManageConsultant() {
    
    const [consultants, setConsultants] = useState([]);
    const [show, setShow] = useState(false);
    const [consultantName, setConsultantName] = useState('');
    const [consultantEmail, setConsultantEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [country, setCountry] = useState('');
    const [deleteConsultantId, setDeleteConsultantId] = useState(null);
    const [editConsultant, setEditConsultant] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const handleClose = () => {setShow(false); setDeleteConsultantId(null); setEditConsultant(null);};
    const handleShow = () => setShow(true);

    const fetchData = async () => {
    
        try {
          const response = await axios.get('https://localhost:44312/api/Consultant/ConsultantList',);
    
          setConsultants(response.data.listCRegistration || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const handleAddConsultant = async (e) => {
        e.preventDefault();
        
        
        try {
          const response = await axios.post('https://localhost:44312/api/Consultant/ConsultantRegistration', {
            Name: consultantName,
            Email: consultantEmail,
            Password: password,
            Country: country,
            Contact: contact,
            Date: '',
            Time: '',
            To_Time: '',
            UserType:''
 
          });

          handleClose();

          fetchData();
          
          setConsultantName('');
          setConsultantEmail('');
          setPassword('');
          setCountry('');
          setContact('');

          const dt = response.data;
          alert(dt.statusMessage);

        } catch (error) {
          console.error('Error adding consultant:', error);
        }
      };

      const handleDeleteConsultant = async (id) => {

        if (!id){ 
          console.log("No consultant to delete.");
            return};
            
        try {

          alert("Are Sure?");
          
          const response = await axios.delete('https://localhost:44312/api/Consultant/ConsultantDelete', {
            data: { Id: id,
                    Name: '',
                    Email: '',
                    Password: '',
                    Country: '',
                    Contact: '',
                    Date: '',
                    Time: '',
                    To_Time: '',
                    UserType:''
                },
          });

          setConsultants((prevConsultants) =>
            prevConsultants.filter(
              (consultant) => consultant.id !== id
            )
          );
  

        } catch (error) {
          console.error("Error deleting consultant:", error);
        }
      };

      const handleEditConsultant = (consultant) => {
        setEditConsultant(consultant);
        setIsEditing(true);
        handleShow();
      };

      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditConsultant((prevConsultant) => ({
          ...prevConsultant,
          [name]: value,
        }));
      };

      const handleUpdateConsultant = async (e) => {
        e.preventDefault();

        try {
          const updatedData = {
            Id: editConsultant.id,
            Name: editConsultant.name,
            Email: editConsultant.email,
            Password: editConsultant.password,
            Country: editConsultant.country,
            Contact: editConsultant.contact,
            Date: '',
            Time: '',
            To_Time: '',
            UserType:''
          };
      
          const response = await axios.put(
            'https://localhost:44312/api/Consultant/ConsultantUpdate',
            updatedData
          );
      
          const updatedConsultant = response.data;
          const updatedConsultants = consultants.map((consultant) =>
          consultant.id === updatedConsultant.id ? updatedConsultant : consultant
          );
      
          setConsultants(updatedConsultants);
          handleClose(); 
          setIsEditing(false);
      
          const dt = response.data;
          alert(dt.statusMessage);

          fetchData();

        } catch (error) {
          console.error('Error updating consultant:', error);
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
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Manage Consultant</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Register Consultant
              </Button>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Consultant Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Country </th>
                            <th>Contact </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {consultants.map((consultant, index) => (                   
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{consultant.id}</td>
                            <td>{consultant.name}</td>
                            <td>{consultant.email}</td>
                            <td>{consultant.password}</td>
                            <td>{consultant.country}</td>
                            <td>{consultant.contact}</td>
                            <td>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEditConsultant(consultant)}><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}} onClick={() => handleDeleteConsultant(consultant.id)}><i class="material-icons">&#xE872;</i></a>
                                 
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
        <Modal.Title>{editConsultant ? 'Edit Consultant' : 'Register Consultant'}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="txtName" name="name" aria-describedby="emailHelp" placeholder="Enter Consultant Name"
                    value={editConsultant ? editConsultant.name : consultantName} onChange={(e) => (editConsultant ? handleEditChange(e) : setConsultantName(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="txtEmail" name="email" aria-describedby="emailHelp" placeholder="Enter Email"
                    value={editConsultant ? editConsultant.email : consultantEmail} onChange={(e) => (editConsultant ? handleEditChange(e) : setConsultantEmail(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="txtPassword" name="password" aria-describedby="emailHelp" placeholder="Enter Password"
                    value={editConsultant ? editConsultant.password : password} onChange={(e) => (editConsultant ? handleEditChange(e) : setPassword(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" id="txtCountry" name="country" aria-describedby="emailHelp" placeholder="Enter Country"
                    value={editConsultant ? editConsultant.country : country} onChange={(e) => (editConsultant ? handleEditChange(e) : setCountry(e.target.value))}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" id="txtContact" name="contact" aria-describedby="emailHelp" placeholder="Enter Contact No"
                    value={editConsultant ? editConsultant.contact : contact} onChange={(e) => (editConsultant ? handleEditChange(e) : setContact(e.target.value))}/>
                </div>
                
                  <button type="button" class="btn btn-success mt-4" onClick={(e) => isEditing ? handleUpdateConsultant(e) : handleAddConsultant(e)}>
                  {isEditing ? 'Update Consultant' : 'Register'}
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
 
export default ManageConsultant;
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
 
function ManageUser() {
    
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const handleClose = () => {setShow(false); setEditUser(null);};
    const handleShow = () => setShow(true);

    const fetchData = async () => {
    
        try {
          const response = await axios.get('https://localhost:44312/api/User/UserList',);
    
          setUsers(response.data.listURegistration || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const handleDeleteUser = async (id) => {

        if (!id){ 
          console.log("No users to delete.");
            return};
            
        try {

          alert("Are Sure?");
          
          const response = await axios.delete('https://localhost:44312/api/User/UserDelete', {
            data: { Id: id,
                    Type: '',
                    Name: '',
                    Email: '',
                    Password:'',
                    JobType: '',
                    Country: '',
                    Contact: ''
                },
          });

          setUsers((prevUsers) =>
          prevUsers.filter(
              (user) => user.id !== id
            )
          );
  

        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

      const handleEditUser = (user) => {
        setEditUser(user);
        setIsEditing(true);
        handleShow();
      };

      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };

      const handleUpdateUser = async (e) => {
        e.preventDefault();

        try {
          const updatedData = {
            Id: editUser.id,
            Name: editUser.name,
            Email: editUser.email,
            Password: editUser.password,
            Contact: editUser.contact,
            Country: editUser.country,
            JobType: editUser.jobType
          };
      
          const response = await axios.put(
            'https://localhost:44312/api/User/UserUpdate',
            updatedData
          );
      
          const updatedUser = response.data;
          const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
      
          setUsers(updatedUsers);
          handleClose(); 
          setIsEditing(false);
      
          const dt = response.data;
          alert(dt.statusMessage);

          fetchData();

        } catch (error) {
          console.error('Error updating user:', error);
        }
      };

  return (
 
       <div class="container ">
        <AdminNavbar />
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div class="row ">
           
           <div class="col-sm-3 mt-5 mb-4 text-gred">
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Manage Users</b></h2></div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password </th>
                            <th>Country</th>
                            <th>Job Type</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (                   
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.country}</td>
                            <td>{user.jobType}</td>
                            <td>{user.contact}</td>
                            <td>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEditUser(user)}><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}} onClick={() => handleDeleteUser(user.id)}><i class="material-icons">&#xE872;</i></a>
                                 
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
        <Modal.Title>{'Edit Time Slot'}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div class="form-group">
                    <input type="txt" class="form-control" id="txtName" name="name" placeholder="Enter Applicant Name"
                    value={editUser ? editUser.name : ''} onChange={handleEditChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="txtEmail" name="email" placeholder="Enter Email"
                    value={editUser ? editUser.email : ''} onChange={handleEditChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="txtPassword" name="password" placeholder="Enter Password"
                    value={editUser ? editUser.password : ''} onChange={handleEditChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtCountry" name="country" placeholder="Enter Applying Country"
                    value={editUser ? editUser.country : ''} onChange={handleEditChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtJob" name="jobType" placeholder="Enter Job Type"
                    value={editUser ? editUser.jobType : ''} onChange={handleEditChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="txt" class="form-control" id="txtContact" name="contact" placeholder="Enter Contact No"
                    value={editUser ? editUser.contact : ''} onChange={handleEditChange} />
                </div>
                
                  <button type="button" class="btn btn-success mt-4" onClick={handleUpdateUser}>
                  Update Applicant
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
 
export default ManageUser;
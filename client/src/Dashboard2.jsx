import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button, Card, Navbar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard2 = () => {
    const[username, setUsername] = useState('');
    const navigate = useNavigate();
    useEffect(()  =>{
        try {
           var  response = axios.get('https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/spec#/users/UserController_getUserById', username,
              {headers: {'Content-Type': 'application/json'
            }
          })   
          console.log(response.data.valid);
            setUsername(res.data.username);
            toast.success('Login successful!');
            navigate('/dashboard2');        
          } catch (error) {
            // Handle server errors
            if (error.response) {
              console.error('Server error:', error.response.data);
              toast.error(error.response.data.message || 'User login failed'); 
            } else if (error.request) {
              // The request was made but no response was received
              console.error('Network error:', error.request);
              toast.error('Network error. Please try again.');
            } else {
              //request Error
              console.error('Error:', error.message);
              toast.error('An unexpected error occurred.');
            }
          }
        },[]);
  return(
    <Container fluid>
      {/*Navbar*/}
      <Navbar bg="light" className="justify-content-between p-2 border">
       <Navbar.Brand>User Dashboard</Navbar.Brand>
       <div className="d-flex align-items-center">
        <span className="me-3">{username}</span>
       </div>
       </Navbar>

       <Row className="mt-3">
        {/*Sidebar */}
        <Col md={2} className="d-flex flex-column align-items-start">
         {/* <Button onClick={fetchResources} variant="secondary" className="mb-2 w-100">Resource</Button> */}
          <Link to="/resource" className="btn btn-secondary mb-2 w-100">Resource</Link>
          <Link to="/search" className="btn btn-secondary mb-2 w-100">Search</Link>
          <Link to="/upload" className="btn btn-secondary mb-2 w-100">Upload</Link>
          <Link to="/download" className="btn btn-secondary mb-2 w-100">Download</Link>
          <Link to="/create" className="btn btn-secondary mb-2 w-100">Creation</Link> 
        </Col>

        {/*Main Content */}
        <Col md ={10}>
          <div className="d-flex justify-content-between">
            {/* Logo */}
            <img src="/logo.png" alt="Logo" style={{ height: "60px" }} />
            </div>
          
          <div className="text-center mt-4">
            <h4>Welcome!</h4>
            <Card className="p-3 mt-3 mx-auto" style={{maxWidth:"500px"}}>
              <h5>GIMP_Plus Services list:</h5>
              <p><strong>Resource Catalogue Service:</strong>provides API for resources management</p>
              <p><strong>Search Service:</strong>Provides Search and Filter Service</p>
              <p><strong>File Upload Service:</strong>Uploading resources and storing of files.</p>
              <p><strong>Download Service:</strong>Provide files download Service</p>
              <p><strong>Login User Services:</strong>Register and Login to access Create, Upload, Delete Services</p>
            </Card>
          </div>
          </Col>
       </Row>

       {/* Footer */}
       <footer className="text-center mt-4 p-3 border-top">
        <img src="logo.png" alt="Logo" style={{ height: "40px" }} />
       {/* <a href="#">Home</a> | <a href="#">Contact</a> | <a href="#">Help</a>*/}
        <p className="mt-2">GIMP_Plus 2025</p>
       </footer>
    </Container>
  );
}

export default Dashboard2;

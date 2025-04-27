import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button, Card, Navbar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { SERVER_URL } from './Api'; 


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentView, setCurrentView] = useState('');
  // get username
  const { userId } = useParams();
  const [name, setName] = useState('');
  //value set to false means using is not logging, based in session in Logging page
  const loginState = sessionStorage.getItem('isLogin?');
  const [show,setShow] = useState(false || loginState);
  //fetch data- username, token
  useEffect(() => { 
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if(!token) return navigate('/login');
      try {
      var response = await axios.get(`${SERVER_URL}/users/${userId}`,
      {headers: {Authorization: `Bearer ${token}`}                                 	
         });
        console.log(response);
       if(response.data.valid){
        setName(response.data.username);
        toast.success(response.data.message || 'fetch username successful!');
        setData(response.data);
        setError(null);
      } 
      } catch (error) {
        {
          // Handle server errors
          if (error.response) {
            console.error('Server error:', error.response.data);
            toast.error(error.response.data.message || 'Login failed'); 
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
  } 
  fetchData(); 
  } },[]);
  

  const logout = () =>{
    sessionStorage.clear();
    window.location.href='/';
  }
  
  let navBar = 
    <Navbar bg="light" className="justify-content-between p-2 border">
      <Navbar.Brand></Navbar.Brand>
      <div className="d-flex align-items-center">
          <Link to="/login" className="btn btn-secondary btn-sm me-2">Login</Link>
          <Link to="/register" className ="btn btn-secondary btn-sm">Register</Link>
      </div>
    </Navbar>

    if(show){
      navBar = 
        <Navbar bg="light" className="justify-content-between p-2 border">
          <Navbar.Brand></Navbar.Brand>
          <div className="d-flex align-items-center">
              <span className="me-3">{name.username}</span> 
              <Link to="/" className ="btn btn-secondary  btn-sm" onClick={logout}>Log out</Link>
          </div>
        </Navbar>
    }

    let sideBar = <>
            
              <Link to="/resource" className="btn btn-secondary mb-2 w-100">Resource</Link>
              <Link to="/search" className="btn btn-secondary mb-2 w-100">Search</Link>
      </>
      if(show){
        sideBar = <>
          <Link to="/create" className="btn btn-secondary mb-2 w-100">Creation</Link> 
          <Link to="/download" className="btn btn-secondary mb-2 w-100">Download</Link>
          <Link to="/upload" className="btn btn-secondary mb-2 w-100">Upload</Link>
        </>
      }
      
  return(
    <Container fluid>

       {navBar}
       <ToastContainer position="top-center" /> {/*ToastContainer */}
       <Row className="mt-3">
          {/*Sidebar */}
          <Col md={2} className="d-flex flex-column align-items-start">
            
              {sideBar}
          </Col>

          {/*Main Content */}
          <Col md ={10}>
              {/* <div className="d-flex justify-content-between"> */}
                {/* Logo */}
                {/* <img src="/logo.png" alt="Logo" style={{ height: "60px" }} /> */}
              {/* </div> */}
              
              <div className="text-center mt-4">
                <h4>Welcome</h4>
                <Card className="p-3 mt-3 mx-auto" style={{maxWidth:"500px"}}>
                    <h5>GIMP_Plus Services list:</h5>
                    <p><strong>Resource Catalogue Service:</strong>provides API for resources management</p>
                    <p><strong>Search Service:</strong>Provides Search and Filter Service</p>
                    <p><strong>File Upload Service:</strong>Uploading resources and storing of files.</p>
                    <p><strong>Download Service:</strong>Provide files download Service</p>
                    <p>GIOER services login access only: Creation, Download & Upload!</p>
                </Card>
              </div>
            </Col>
       </Row>

       {/* Footer */}
       <footer className="text-center mt-4 p-3 border-top">
          <img src="logo.png" alt="Logo" style={{ height: "40px" }} />
        {/* <a href="#">Home</a> | <a href="#">Contact</a> | <a href="#">Help</a>*/}
        <div className="copyright">
        &copy; Copyright{' '}
        <strong>
          <span>GIMP_PLUS 2025 / GIOER 2025</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Design: <h8>SWE6813 GROUP 5</h8>
      </div>
       </footer>
    </Container>
  );
};

export default Dashboard;
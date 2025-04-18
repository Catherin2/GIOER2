import React, {useState} from "react";
import { Container, Row, Col, Button, Card, Navbar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentView, setCurrentView] = useState('');

  const fetchResources = async () =>{
    const mockData = [
      {id:1, name:"Resource A", description: "This is resource A"},
      {id:2, name:"Resource B", description:"This is resource B"},
    ];

    setTimeout(()=>{
      setData(mockData);
      setCurrentView('resources');
    }, 500);
  }
  
  return(
    <Container fluid>
      {/*Navbar*/}
      <Navbar bg="light" className="justify-content-between p-2 border">
       <Navbar.Brand>Service Home UI</Navbar.Brand>
       <div className="d-flex align-items-center">
        <span className="me-3">User[name]</span>
        <Link to="/login" className="btn btn-primary btn-sm me-2">Login</Link>
        <Link to="/register" className ="btn btn-outline-primary btn-sm">Register</Link>
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
            <h4>Welcome</h4>
            <Card className="p-3 mt-3 mx-auto" style={{maxWidth:"500px"}}>
              <h5>GIMP_Plus Services list:</h5>
              <p><strong>Resource Catalogue Service:</strong>provides API for resources management</p>
              <p><strong>Search Service:</strong>Provides Search and Filter Service</p>
              <p><strong>File Upload Service:</strong>Uploading resources and storing of files.</p>
              <p><strong>Download Service:</strong>Provide files download Service</p>
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
};

export default Dashboard;

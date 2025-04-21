import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Upload(){
// State variable
    const [values, setValues] = useState({
    fileName: "",
    fileUrl:"",
    upLoadDate:""
    });      
   // Function to upload files (extensions) 
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('url', values);   
      try {
       var  response = await axios.post('', setValues, 
          {headers: {'Content-Type': 'application/json',
            }})   
      console.log(response => setValues(response.data.status));
        // Handle successful upload
        toast.success('Upload successful!');
        document.body.appendChild(response);
      } catch (error) {
        // Handle server errors
        if (error.response) {
          console.error('Server error:', error.response.data);
          toast.error(error.response.data.message || 'Upload failed'); 
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
    return(
        <Container>
            {/* Navbar*/}
            <Navbar bg="white m-4 nav flex-column">
                <Navbar.Brand> Upload Service </Navbar.Brand>
            </Navbar>

            <Row className="mt-4 bg-white">
                {/* Sidebar */}
                <Col md={2}>
                    <Card >
                        <Card.Body>                
                            <Button variant="secondary" href="/" className="mb-2 w-100">Dashboard</Button>
                       </Card.Body>    
                    </Card>
                </Col>

                {/* Main Content */}
                <Col md ={9}>
                <Card>
                <Card.Body>
                    <h5>File Upload Form</h5>
                </Card.Body>
                <Card>              
              <div>
                <ToastContainer position="top-center" /> {/*ToastContainer */}
                 <form onSubmit={handleSubmit}>
     <div className="mb-3">
    <label htmlFor="FileName" className="form-label">FileName</label>
    <input type="text" onChange={(e) => setValues({...values, fileName: e.target.value})} required className="form-control" id="fileName" placeholder="FileName..."></input>
     </div>
     <div className="mb-3">
    <label htmlFor="fileUrl" className="form-label">FileUrl</label>
    <input type="url" onChange={(e) => setValues({...values, fileUrl: e.target.value})} required className="form-control" id="fileUrl" placeholder="FileUrl..."></input>
     </div>
     <div className="mb-3">
    <label htmlFor="upLoadDate" className="form-label">UploadDate</label>
    <input type="date" onChange={(e) => setValues({...values, upLoadDate: e.target.value})} required className="form-control" id="uploadDate"></input>
    </div>
    <button  className="btn btn-success rounded">Submit</button>
    </form>
                    </div>
                </Card>
                </Card>
                </Col>                    
            </Row>
        </Container>       
    );
}

export default Upload;

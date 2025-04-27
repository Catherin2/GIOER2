import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload(){
// State variables
  const [file, setFile] = useState('');
  const[description, SetDescription] = useState('');
  const accessToken = sessionStorage.getItem('accessToken');
 
  const handleFile=(e)=>{
    const file=e.target.files[0];
    console.log(file);
    if(file){
      setFile(file)
    }
  }
   // Function to upload files (extensions) 
   
    const handleUpload = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('file', file);   
      try {
       var  response = await axios.post('https://nestjs-g2fpc8bchsf0gyhy.canadacentral-01.azurewebsites.net/api/file/upload', {file, description}, 
          {headers: {'Content-Type': 'application/json',
            'Authorization' : `Bearer ${accessToken}`
            }});   
      console.log(response => setFile(response.data.status));
        // Handle successful upload
        
        toast.success(response.data.message || 'Upload successful!');
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
                <div className='upload-preview-section'>
                    <div className='upload-box'>
                    <form onSubmit={handleUpload}>
                  <div className="mb-3">
                  <input type="file" onChange={handleFile} />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="filetext" className="form-label">Description</label>
                 <input type="text" onChange={(e) => SetDescription(e.target.value)}  className="form-control" id="description" placeholder="Description..."/>
                   </div>
                  <button  type="submit" className="btn btn-success rounded">Upload</button>
                    </form>
                    </div>
                    </div>         
              </div>
                </Card>
                </Card>
                </Col>                    
            </Row>
        </Container>       
    );
}

export default Upload;

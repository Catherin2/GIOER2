import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


function Upload(){
// State variables

  const [selectedFile, setSelectedFile] = useState(null);
  const[description, SetDescription] = useState('');
  const accessToken = sessionStorage.getItem('accessToken')
  const handleFileChanges = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      var response = await axios.post('https://nestjs-g2fpc8bchsf0gyhy.canadacentral-01.azurewebsites.net/api/file/upload', {selectedFile, description},                
         {headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${accessToken}`
        },
      });
      console.log('File upload successful:', response.data);
        document.body.appendChild(response);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('File upload error:', error);
      alert('File upload failed!');
    }
  };
   // Function to upload files (extensions)    
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
              <div>                   <div className='upload-preview-section'>
                    <div className='upload-box'>
                    <form onSubmit={handleUpload}>
                  <div className="mb-3">
                  <input type="file" onChange={handleFileChanges} />
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

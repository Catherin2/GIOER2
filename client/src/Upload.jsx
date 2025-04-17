import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";




function Upload(){
// State variable
    const [values, setValues] = useState({
    fileName: "",
    fileUrl:"",
    upLoadDate:""
    });  
    // Function to upload files (extensions) 
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('url', values);
        axios
          .post("", formdata,
            {headers: {'Content-Type': 'application/json'
            }})
          .then((res) => {
            if(res => setValues(res.data.status) === "Success"){
              ("Succeded")
              document.body.appendChild(res);
            }else{
              ("Failed")
            }     
          })
          .catch((err) => (err.message));
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
                            <Button variant="secondary" href="register" className="mb-2 w-100">SignUp/Login</Button>
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
                 <form onSubmit={handleSubmit}>
     <div className="mb-3">
    <label htmlFor="FileName" className="form-label">FileName</label>
    <input type="text" onChange={(e) => setFileName(e.target.value)} required className="form-control" id="fileName" placeholder="FileName..."></input>
     </div>
     <div className="mb-3">
    <label htmlFor="file-Url" className="form-label">FileUrl</label>
    <input type="url" onChange={(e) => setFileUrl(e.target.value)} required className="form-control" id="file-Url" placeholder="FileUrl..."></input>
     </div>
     <div className="mb-3">
    <label htmlFor="upLoadDate" className="form-label">UploadDate</label>
    <input type="date" onChange={(e) => setDate(e.target.value)} required className="form-control" id="uploadDate"></input>
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

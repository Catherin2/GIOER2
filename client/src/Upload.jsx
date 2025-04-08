import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";




function Upload(){
// State variable

    const [values, setValues] = useState({
    fileName: "",
    fileUrl:"",
    upLoadDate:""
    });
      const handleValues= (e) =>{
        setValues(e.target.values[0])
      }
    const navigate = useNavigate();  
    // Function to upload files (extensions)

    const handleUpload = (e) => {
        e.preventDefault();
        const formdata = FormData();
        formdata.append('url', values);
        axios
          .post("http://3.148.177.194/spec#/File/FileController_uploadFile", formdata,
            {headers: {'Content-Type': 'application/json'
            }})
          .then((res) => {
            console.log(res);
            navigate('/dashboard')
            windows.location.reload();
          })
          .catch((err) => console.log(err));
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
                            <Button variant="secondary" href="dashboard" className="mb-2 w-100">Dashboard</Button>
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
                 <form>
    <div className="mb-3">
    <label htmlFor="ID" className="form-label">ID</label>
    <input type="text" onChange={handleValues} className="form-control" id="InputID" placeholder="ID..." aria-describedby="emailHelp"></input>
    <div id="id" className="form-text"></div>
    </div>
     <div className="mb-3">
    <label htmlFor="title" className="form-label">FileName</label>
    <input type="text" onChange={handleValues} className="form-control" id="InputTitle" placeholder="FileName..."></input>
     </div>
     <div className="mb-3">
    <label htmlFor="url-field" className="form-label">FileUrl</label>
    <input type="url" onChange={handleValues} className="form-control" id="url-field" placeholder="URL..."></input>
     </div>
     <div className="mb-3">
    <label htmlFor="upLoadDate" className="form-label">UploadDate</label>
    <input type="date" onChange={handleValues} className="form-control" id="uploadDate"></input>
    </div>
    <button onClick={handleUpload} className="btn btn-success rounded">Upload</button>
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

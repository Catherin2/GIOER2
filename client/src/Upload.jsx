import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";



function Upload(){
// State variable

    const {id} = useParams();

    const [values, setValues] = useState({
    fileName: "",
    fileUrl:"",
    upLoadDate:""
    });

    const navigate = useNavigate();

    
    // Function to upload files (extensions)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("",+id, values,
            {headers: {'Content-Type': 'application/json'
            }
          }
          )
          .then((res) => {
            console.log(res);
            navigate("/upload");
          })
          .catch((err) => console.log(err))
      }
      useEffect(() => { 
        axios
          .get(""+id)
          .then((res) => setValues({
            ...values, id:res.data.id,
             fileName:res.data.fileName, 
             fileUrl:res.data.fileUrl,
             upLoadDate:res.data.upLoadDate})
          )
          .catch((err) => console.log(err));
      }, []);

    

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
                            <Button variant="secondary" className="mb-2 w-100">Home</Button>
                            <Button variant="secondary" className="mb-2 w-100">Resource</Button>
                            <Button variant="secondary" className="mb-2 w-100">Creation</Button>
                            <Button variant="secondary" className="mb-2 w-100">Search</Button>
                            <Button variant="secondary" className="mb-2 w-100">Upload</Button> 
                            <Button variant="secondary" className="mb-2 w-100">Download</Button>
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
    <label htmlFor="ID" className="form-label">ID</label>
    <input type="int" className="form-control" id="InputID" aria-describedby="emailHelp"></input>
    <div id="id" className="form-text"></div>
    </div>
     <div className="mb-3">
    <label htmlFor="title" className="form-label">FileName</label>
    <input type="text" className="form-control" id="InputTitle"></input>
     </div>
     <div className="mb-3">
    <label htmlFor="fileUrl" className="form-label">FileUrl</label>
    <input type="text" className="form-control" id="InputDescription"></input>
     </div>
     <div className="mb-3">
    <label htmlFor="upLoadDate" className="form-label">UploadDate</label>
    <input type="text" className="form-control" id="InputDescription"></input>
    </div>
    <button type="submit" className="btn btn-success rounded">Upload</button>
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

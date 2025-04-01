import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from "react-router-dom";
import axios from "axios";



function Creation(){
// State variable


    const [values, setValues] = useState({
    title: "",
    description:"",
    category:"",
    tags:"",
    });

    const navigate = useNavigate();

    
    // Function to create (extensions)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("",values,
            {headers: {'Content-Type': 'application/json'
            }
          }
          )
          .then((res) => {
            console.log(res);
            navigate("/create");
          })
          .catch((err) => console.log(err))
      }
      useEffect(() => { 
        axios
          .get("", values)
          .then((res) => setValues({
            ...values, title:res.data.id,
             description:res.data.fileName, 
             category:res.data.fileUrl,
             tags:res.data.upLoadDate})
          )
          .catch((err) => console.log(err));
      }, []);

    

    return(
        <Container>
            {/* Navbar*/}
            <Navbar bg="white m-4 nav flex-column">
                <Navbar.Brand> Creation Service </Navbar.Brand>
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
                    <h5>New Extension Form</h5>
                </Card.Body>
                <Card>              
              <div>
                 <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="int" className="form-control" id="InputID" aria-describedby="emailHelp"></input>
    <div id="id" className="form-text"></div>
    </div>
     <div className="mb-3">
    <label htmlFor="descrip" className="form-label">Description</label>
    <input type="textarea" className="form-control" id="InputDescrip"></input>
     </div>
     <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <input type="text" className="form-control" id="InputDescription"></input>
     </div>
     <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tags</label>
    <input type="text" className="form-control" id="InputDescription"></input>
    </div>
    <button type="submit" className="btn btn-success rounded">Save</button>
    </form>
                    </div>
                </Card>
                </Card>
                </Col>                    
            </Row>
        </Container>
        

    );
}

export default Creation;

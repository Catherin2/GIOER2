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
 
    // Function create new extensions

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/spec#/extensions/ExtensionController_createExtension",values,
            {headers: {'Content-Type': 'application/json'
            }
          }
          )
          .then((res) => {
            console.log(res);
            window.location.reload;
          })
          .catch((err) => console.log(err))
      }
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
                            <Button variant="secondary" href="dashboard" className="mb-2 w-100">Dashboard</Button>
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
    <input type="text" className="form-control" id="InputID" placeholder="Title..." onChange={(e) => setValues({...values, title: e.target.value})} aria-describedby="emailHelp"></input>
    <div id="id" className="form-text"></div>
    </div>
     <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="textarea" className="form-control" id="InputDescrip" placeholder="Description..." onChange={(e) => setValues({...values, description: e.target.value})}></input>
     </div>
     <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <input type="text" className="form-control" id="InputDescription" placeholder="Category..." onChange={(e) => setValues({...values, category: e.target.value})}></input>
     </div>
     <div className="mb-3">
    <label htmlFor="tags" className="form-label">Tags</label>
    <input type="text" className="form-control" id="InputTags" placeholder="Tags..." onChange={(e) => setValues({...values, tags: e.target.value})}></input>
    </div>
    <button type="submit" className="btn btn-success rounded">Submit</button>
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

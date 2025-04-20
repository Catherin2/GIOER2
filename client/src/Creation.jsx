import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Creation(){
// State variable
    const [values, setValues] = useState({
        "data":{
            title: "",
    description:"",
    category:[1],
    tags:""
        }  
    });
    const navigate = useNavigate();
    // Function create new extensions
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         var  response = await axios.post('https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/extensions', values, 
            {headers: {'Content-Type': 'application/json'
          }
        })   
        console.log(response.data);
          // Handle successful registration
          toast.success('Extension created successful!');
          navigate('/dashboard');        
        } catch (error) {
          // Handle server errors
          if (error.response) {
            console.error('Server error:', error.response.data);
            toast.error(error.response.data.message || 'Extension creation failed'); 
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
                          <Navbar.Brand> Creation Service </Navbar.Brand>
                      </Navbar>
            {/* Nav*/}
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
                    <h5>New Extension Form</h5>
                </Card.Body>
                <Card>              
              <div>
              <ToastContainer position="top-center" /> {/*ToastContainer */}
                 <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" placeholder="Title..." onChange={(e) => setValues({...values, title: e.target.value})} required aria-describedby="emailHelp"></input>
    <div id="id" className="form-text"></div>
    </div>
     <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="textarea" className="form-control" id="description" placeholder="Description..." onChange={(e) => setValues({...values, description: e.target.value})} required></input>
     </div>
     <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <input type="text" className="form-control" id="category" placeholder="Category..." onChange={(e) => setValues({...values, category: e.target.value})} required></input>
     </div>
     <div className="mb-3">
    <label htmlFor="tags" className="form-label">Tags</label>
    <input type="text" className="form-control" id="tags" placeholder="Tags..." onChange={(e) => setValues({...values, tags: e.target.value})} required></input>
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

import React, {useState} from 'react';
import { SERVER_URL } from './Api';
import {Container, Row, Col, Button, Card, Navbar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Creation({onCreate}){


    const navigate = useNavigate();
    
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      onCreate(title,description,category,tags);
      navigate('/');
    };

    //needs more work
    const handleTags = (e) => {
      const updatedTags = [...tags,e.target.value];
      setTags(updatedTags);
    };

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
                    <form onSubmit={handleSubmit} autoComplete='off'>
                      <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="title" 
                        placeholder="Title..." 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                        required 
                        aria-describedby="emailHelp">

                        </input>
                      <div id="id" className="form-text"></div>
                      </div>
                      
                      <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="category" 
                        placeholder="Category..." 
                        onChange={(e) => setCategory( e.target.value)}
                        value={category}
                        required>

                        </input>
                      </div>

                      <div className="mb-3">
                      <label htmlFor="tags" className="form-label">Tags</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="tags" 
                        placeholder="Tags..." 
                        onChange={handleTags} 
                        value={tags}
                        required>

                        </input>
                      </div>

                      <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea 
                        type="textarea" 
                        className="form-control" 
                        id="description" 
                        placeholder="Description..." 
                        onChange={(e) =>setDescription( e.target.value)} 
                        value={description}
                        required>

                        </textarea>
                      </div>
                      <button type="submit" className="btn btn-secondary rounded">Submit</button>
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

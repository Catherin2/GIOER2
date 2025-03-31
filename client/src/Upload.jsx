import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";



function Upload(){
// State variable
    const [resources, setResources] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isResourceClicked, setResourceClicked] = useState(false);

    // Function to fetch resources (extensions)
    const fetchResources = async () => {
        try{
            const response =await fetch('/api/extensions')
            const data = await response.json();
            setResources(data);
            setIsResourceClicked(true);
        } catch (error){
            console.error('Error fetching resources:', error);
        }
    };

    // Search functionality
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('searching for :', searchTerm);

    };   
    

    return(
        <Container>
            {/* Navbar*/}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href = "#"> Upload Service </Navbar.Brand>
                <Form inline>
                    <Form.Control type = "text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar>

            <Row className="mt-4">
                {/* Sidebar */}
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Button variant="secondary m-2" block>Upload</Button>
                            <Button variant="secondary m-2" block>Save</Button>
                       </Card.Body>    
                    </Card>
                </Col>

                {/* Main Content */}
                <Col md ={9}>
                <Card>
                <Card.Body>
                    <h2>Upload Service</h2>
                </Card.Body>
                <Card>
                    <div>
                    <form>

  <div class="mb-3">
    <label for="ID" class="form-label">ID</label>
    <input type="int" class="form-control" id="InputID" aria-describedby="emailHelp"></input>
    <div id="id" class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input type="text" class="form-control" id="InputTitle"></input>
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input type="text" class="form-control" id="InputDescription"></input>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
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

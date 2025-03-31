import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";



function Upload(){
// State variable
    const [resources, setResources] = useState([]);
    
    
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
                            <Button variant="secondary m-2 btn-lg" block>Dashboard</Button>
                       </Card.Body>    
                    </Card>
                </Col>

                {/* Main Content */}
                <Col md ={9}>
                <Card>
                <Card.Body>
                    <h5>Input Upload Info</h5>
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
    <label for="title" class="form-label">FileName</label>
    <input type="text" class="form-control" id="InputTitle"></input>
  </div>
  <div class="mb-3">
    <label for="fileUrl" class="form-label">FileUrl</label>
    <input type="text" class="form-control" id="InputDescription"></input>
  </div>
  <div class="mb-3">
    <label for="upLoadDate" class="form-label">UploadDate</label>
    <input type="text" class="form-control" id="InputDescription"></input>
  </div>
  <button type="submit" class="btn btn-success rounded">Submit</button>
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

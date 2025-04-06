import React, {useState} from 'react';
import {Container, Row, Col, Button, Card, Navbar, Form} from 'react-bootstrap';



const Resource = () => {

   // State variable
   const [resources, setResources] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isResourceClicked, setResourceClicked] = useState(false);

   // Function to fetch resources (extensions)
   const fetchResources = async () => {
       try{
           const response =await fetch('https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/spec#/extensions/ExtensionController_getAllExtension')
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
               <Navbar.Brand href = "#"> Dashboard </Navbar.Brand>
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
                           <Button variant="primary" block>Resource</Button>
                           <Button variant="primary" block>Search</Button>
                           <Button variant="primary" block>Upload</Button>
                           <Button variant="primary" block>Download</Button>
                           <Button variant="primary" block>Plugin</Button>
                           <Button variant="primary" block>Extension</Button>
                      </Card.Body>    
                   </Card>
               </Col>

               {/* Main Content */}
               <Col md ={9}>
               <Card>
               <Card.Body>
                   <h2>Welcome to Services List</h2>
                   <ul>
                       <li><strong>Resource Catalogue Service:</strong>provide API service for resource management</li>
                       <li><strong>Search Service:</strong>provide search service</li>
                       <li><strong>File Upload Service:</strong>provide file upload service</li>
                       <li><strong>Download Service:</strong>provide file download service</li>                    
                   </ul>
               </Card.Body>
               </Card>
               </Col>                    
           </Row>
       </Container>

   );
}

export default Resource;
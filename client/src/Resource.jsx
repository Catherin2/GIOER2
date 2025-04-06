import React, {useEffect, useState} from "react";
import axios from 'axios';

const Resource = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        /*axios.get('/api/extensions')*/
         axios.get('http://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/extensions')
        .then(Response => {
            console.log('API response:',Response.data)
           // setResources(Response.data);
           if(Array.isArray(Response.data)) {
            setResources(Response.data);
        } else {
          console.error('Invalid API response format:', Response.data);
        }
    })
      .catch(error => console.error('Error fetching resources:', error));
      }, []);
        
    return(
        <div className="container">
            <h2>Resource</h2>
            <button className="btn btn-secondary mb-3" onClick={() => window.history.back()}>Back to Dashboard</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Upload date</th>
                        <th>Rating</th>
                        <th>Archived</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(resources) && resources.map((res, index) => (
                            <tr key={index}>
                            <td>{res.id}</td>
                            <td>{res.title}</td>
                            <td>{res.category}</td>
                            <td>{res.author}</td>
                            <td>{res.uploadDate}</td>
                            <td>{res.rating}</td>
                            <td>{res.archived ? "yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    };

<<<<<<< HEAD
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
=======
    export default Resource;
>>>>>>> ca29aa6e07c9a6c1ad9fcacdf9cce8623b66f5ab

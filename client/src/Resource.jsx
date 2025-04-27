import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from './Api';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Show 5 resources per page
  const [totalPages, setTotalPages] = useState(1); // optional, if backend sends total pages
  const [error, setError] = useState('');
  //const navigate = useNavigate(); // for update navigation

  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);


  useEffect(() => {
    fetchResources();
  }, [page]); // Refetch resources when page changes

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/extensions`, {
        params: {
          page: page,
          limit: limit,
        },
      });

      if (response.data && response.data.entities) {
        setResources(response.data.entities);
        if (response.data.totalPages) {
          setTotalPages(response.data.totalPages);
        }
        setError('');
      } else {
        console.error("Invalid API response format");
        setError('Invalid API response.');
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to fetch resources.');
    }
  };

  const handleEditClick = (resource) => {
    setSelectedResource({ ...resource });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedResource(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedResource((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        title: selectedResource.title,
        description: selectedResource.description,
        category: selectedResource.category,
        tags: selectedResource.tags.split(',').map((tag) => tag.trim()),
        archived: selectedResource.archived === 'true',
      };

      await axios.patch(`${SERVER_URL}/extensions/${selectedResource.id}`, payload);
      fetchResources();
      handleModalClose();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update resource");
    }
  };

  const handleDelete = async(id) => {
    if(window.confirm("Are you sure you want to delete this extension?")){
      try{
        await axios.delete(`${SERVER_URL}/extensions/${id}`);
        alert("Extension deleted Successfully!");
        fetchResources(); // Refresh list
      } catch (error) {
        console.error('Error deleting extension:', error);
        alert("Failed to delete extension.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Resource Catalogue</h2>
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Dashboard
      </Link>

      {error && <div className="text-danger mb-3">{error}</div>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Upload Date</th>
            <th>Rating</th>
            <th>Archived</th>
            <th>Actions</th>   {/* added new column*/} 
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>
                <Link to={`/extensions/${res.id}`}>
                  {res.title}
                </Link>
              </td>
              <td>{res.category}</td>
              <td>{res.author ? res.author.name : 'N/A'}</td>
              <td>{res.uploadDate ? res.uploadDate.substring(0, 10) : ''}</td>
              <td>{res.rating}</td>
              <td>{res.archived ? "Yes" : "No"}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(res)}>Edit</Button>
                <Button variant="danger"  size="sm" className="me-2" onClick={() => handleDelete(res.id)}>Delete</Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <span>Page {page}</span>
        <Button variant="secondary" disabled={resources.length < limit} onClick={() => setPage(page + 1)}>Next</Button> 
      </div>
     
      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResource && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedResource.title || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={selectedResource.description || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={selectedResource.category || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tags (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  value={selectedResource.tags ? selectedResource.tags.join(', ') : ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Archived</Form.Label>
                <Form.Select
                  name="archived"
                  value={selectedResource.archived ? 'true' : 'false'}
                  onChange={handleInputChange}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
    
export default Resource;

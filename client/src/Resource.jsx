import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from './Api';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Show 5 resources per page
  const [totalPages, setTotalPages] = useState(1); // optional, if backend sends total pages
  const [error, setError] = useState('');

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

  const linkStyle = {
    textDecoration: "none",
    color:'black'
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
            {/* <th>ID</th> */}
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Upload Date</th>
            <th>Rating</th>
            <th>Archived</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id}>
              {/* <td>{res.id}</td> */}
              <td>
                <Link to={`/extensions/${res.id}`}  style={linkStyle}>
                  {res.title}
                </Link>
              </td>
              <td>{res.category}</td>
              <td>{res.author ? res.author.name : 'N/A'}</td>
              <td>{res.uploadDate ? res.uploadDate.substring(0, 10) : ''}</td>
              <td>{res.rating}</td>
              <td>{res.archived ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button 
          variant="secondary" 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span>Page {page}</span>

        <Button 
          variant="secondary" 
          disabled={resources.length < limit} // Disable if last page
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Resource;

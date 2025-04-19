import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from './Api';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [sortField, setSortField] = useState('BY_RATING');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchResources();
  }, [sortField, sortOrder]); // <-- Whenever sortField or sortOrder changes

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/extensions`, {
        params: {
          sortField: sortField,
          sortOrder: sortOrder,
          page: 1,
          limit: 20
        }
      });
      console.log("API response:", response.data);

      if (response.data && response.data.entities) {
        setResources(response.data.entities);
      } else {
        console.error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Resource</h2>
      <Link to="/dashboard" className="btn btn-secondary mb-3">
        Back to Dashboard
      </Link>

      {/* Sort Controls */}
      <div className="d-flex mb-3">
        <Form.Select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="me-3"
        >
          <option value="BY_RATING">Sort by Rating</option>
          <option value="BY_DOWNLOAD_COUNT">Sort by Download Count</option>
          <option value="BY_UPLOAD_DATE">Sort by Upload Date</option>
          <option value="BY_CATEGORY">Sort by Category</option>
        </Form.Select>

        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
      </div>

      {/* Extension Table */}
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
              <td>{res.author ? res.author.name : "N/A"}</td>
              <td>{res.uploadDate ? res.uploadDate.substring(0, 10) : ''}</td>
              <td>{res.rating}</td>
              <td>{res.archived ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Resource;

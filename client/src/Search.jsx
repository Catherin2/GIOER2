import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from './Api';
import { Link } from "react-router-dom";
import { Container, Form, Button, Table } from "react-bootstrap";

const Search = () => {
  const [queryParams, setQueryParams] = useState({
    query: '',
    category: '',
    uploadDate: '',
    tags: '',
    author: '',
    sortField: '',
    sortOrder: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const params = {};

      // Only add non-empty params
      for (const key in queryParams) {
        if (queryParams[key]) {
          params[key] = queryParams[key];
        }
      }

      const response = await axios.get(`${SERVER_URL}/extensions`, { params });

      console.log("Fetched search results:", response.data);
      setResults(response.data.entities || []);
      setError('');
    } catch (err) {
      console.error('Error searching extensions:', err);
      setError('Failed to fetch extensions. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Search Service</h2>
      <Link to="/dashboard" className="btn btn-secondary mb-3">Back to Dashboard</Link>

      <Form className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Query</Form.Label>
          <Form.Control type="text" name="query" value={queryParams.query} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={queryParams.category} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Upload Date (YYYY-MM-DD)</Form.Label>
          <Form.Control type="text" name="uploadDate" value={queryParams.uploadDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control type="text" name="tags" value={queryParams.tags} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={queryParams.author} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Sort Field (BY_RATING, BY_DOWNLOAD_COUNT, BY_UPLOAD_DATE, BY_CATEGORY)</Form.Label>
          <Form.Control type="text" name="sortField" value={queryParams.sortField} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Sort Order (asc or desc)</Form.Label>
          <Form.Control type="text" name="sortOrder" value={queryParams.sortOrder} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" onClick={handleSearch}>
          Fetch Extensions
        </Button>
      </Form>

      {error && <p className="text-danger">{error}</p>}

      {results.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Upload Date</th>
              <th>Rating</th>
              <th>Archived</th>
            </tr>
          </thead>
          <tbody>
            {results.map((ext) => (
              <tr key={ext.id}>
                <td>
                  <Link to={`/extensions/${ext.id}`}>{ext.title}</Link>
                </td>
                <td>{ext.category}</td>
                <td>{ext.uploadDate}</td>
                <td>{ext.rating}</td>
                <td>{ext.archived ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Search;

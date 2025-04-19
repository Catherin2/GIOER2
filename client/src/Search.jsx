import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from './Api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [extensions, setExtensions] = useState([]);
  const [error, setError] = useState('');

  // Fetch extensions
  const fetchExtensions = async () => {
  try {
    const params = {};

    // Only send search params to server
    if (query) params.query = query;
    if (category) params.category = category;
    if (uploadDate) params.uploadDate = uploadDate;
    if (tags) params.tags = tags.split(',').map(tag => tag.trim());
    if (author) params.author = author;

    const response = await axios.get(`${SERVER_URL}/extensions`, { params });

    let fetchedExtensions = response.data.entities || [];

    // Manual client-side sorting
    if (sortField && sortOrder) {
      fetchedExtensions.sort((a, b) => {
        if (sortField === 'BY_UPLOAD_DATE') {
          const dateA = new Date(a.uploadDate);
          const dateB = new Date(b.uploadDate);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        } 
        else if (sortField === 'BY_RATING') {
          return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        else if (sortField === 'BY_DOWNLOAD_COUNT') {
          return sortOrder === 'asc' ? a.downloadCount - b.downloadCount : b.downloadCount - a.downloadCount;
        }
        else if (sortField === 'BY_CATEGORY') {
          const catA = a.category?.toLowerCase() || '';
          const catB = b.category?.toLowerCase() || '';
          if (catA < catB) return sortOrder === 'asc' ? -1 : 1;
          if (catA > catB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
        return 0; // If no match
      });
    }

    console.log('Fetched extensions:', fetchedExtensions);
    setExtensions(fetchedExtensions);
    setError('');
  } catch (err) {
    console.error('Error fetching extensions:', err);
    setError('Failed to fetch extensions. Please try again.');
    setExtensions([]);
  }
};
  // immediately refetch if sortorder or sortfield changes
  //useEffect(() => {
    //fetchExtensions();
 // }, [sortField, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchExtensions();
  };
  
  return (
    <Container className="mt-4">
      <h2>Search Service</h2>
      <Link to="/dashboard" className="btn btn-secondary mb-3">
        Back to Dashboard
      </Link>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Query</Form.Label>
          <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Date (YYYY-MM-DD)</Form.Label>
          <Form.Control value={uploadDate} onChange={(e) => setUploadDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sort Field (BY_RATING, BY_DOWNLOAD_COUNT, BY_UPLOAD_DATE, BY_CATEGORY)</Form.Label>
          <Form.Select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="">Select field</option>
            <option value="BY_RATING">By Rating</option>
            <option value="BY_DOWNLOAD_COUNT">By Download Count</option>
            <option value="BY_UPLOAD_DATE">By Upload Date</option>
            <option value="BY_CATEGORY">By Category</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sort Order</Form.Label>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Select order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="btn btn-primary">
          Fetch Extensions
        </Button>
      </Form>

      {error && <div className="text-danger mt-3">{error}</div>}

      {/* Results Table */}
      {extensions.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Upload Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {extensions.map((ext) => (
              <tr key={ext.id}>
                <td>{ext.title}</td>
                <td>{ext.category}</td>
                <td>{ext.author?.name || 'N/A'}</td>
                <td>{ext.uploadDate?.split('T')[0]}</td>
                <td>{ext.rating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Search;

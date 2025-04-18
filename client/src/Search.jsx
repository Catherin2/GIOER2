import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SERVER_URL } from './Api';

const Search = () => {
  const [extensionId, setExtensionId] = useState('');
  const [extensionDetails, setExtensionDetails] = useState(null);
  const [error, setError] = useState('');

  const handleFetchExtension = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/extensions/${extensionId}`);
       // const response = await axios.get(`http://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/extensions/${extensionId}`);
      console.log('Fetched extension:', response.data);
      setExtensionDetails(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching extension:', err);
      setExtensionDetails(null);
      setError('Extension not found!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Service</h2>
      <Link to="/dashboard" className="btn btn-secondary mb-3">Back to dashboard</Link>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Extension ID"
          value={extensionId}
          onChange={(e) => setExtensionId(e.target.value)}
        />
        <Button onClick={handleFetchExtension} className="mt-2">Fetch Extension</Button>
      </Form>

      {error && <div className="alert alert-danger">{error}</div>}

      {extensionDetails && (
        <div className="card p-3">
          <h5>{extensionDetails.title}</h5>
          <p><strong>Description:</strong> {extensionDetails.description}</p>
          <p><strong>Category:</strong> {extensionDetails.category}</p>
          <p><strong>Tags:</strong> {extensionDetails.tags ? extensionDetails.tags.join(', ') : 'N/A'}</p>
          <p><strong>Author:</strong> {extensionDetails.author ? extensionDetails.author.name : 'N/A'}</p>
          <p><strong>Upload Date:</strong> {extensionDetails.uploadDate}</p>
          <p><strong>Rating:</strong> {extensionDetails.rating}</p>
          <p><strong>Download Count:</strong> {extensionDetails.downloadCount}</p>
          <p><strong>Archived:</strong> {extensionDetails.archived ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Search;

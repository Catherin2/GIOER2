import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from './Api';

const ExtensionDetail = () => {
  const { id } = useParams();
  const [extension, setExtension] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExtension = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/extensions/${id}`);
        console.log('Fetched Extension:', response.data);
        setExtension(response.data);
      } catch (err) {
        console.error('Error fetching extension:', err);
        setError('Extension not found.');
      }
    };

    fetchExtension();
  }, [id]);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <Link to="/resource" className="btn btn-secondary mt-3">Back to Resource List</Link>
      </div>
    );
  }

  if (!extension) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Extension Details</h2>
      <p><strong>Title:</strong> {extension.title}</p>
      <p><strong>Description:</strong> {extension.description}</p>
      <p><strong>Category:</strong> {extension.category}</p>
      <p><strong>Author:</strong> {extension.author || 'N/A'}</p>
      <p><strong>Upload Date:</strong> {extension.uploadDate}</p>
      <p><strong>Rating:</strong> {extension.rating}</p>
      <p><strong>Tags:</strong> {extension.tags?.join(', ')}</p>

      <Link to="/resource" className="btn btn-primary mt-3">Back to Resource List</Link>
    </div>
  );
};

export default ExtensionDetail;


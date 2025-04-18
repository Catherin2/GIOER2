import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from './Api';


const Resource = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/extensions`);
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
              <td>{res.uploadDate}</td>
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

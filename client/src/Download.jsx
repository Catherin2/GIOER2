import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { SERVER_URL } from './Api'; // centralized server URL

const Download = () => {
  const [extensionId, setExtensionId] = useState('');
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!extensionId) {
      setError("Please enter a valid Extension ID");
      return;
    }
    setError(""); // clear previous errors

    try {
      // First fetch the extension info by ID
      const response = await axios.get(`${SERVER_URL}/extensions/${extensionId}`);
      console.log("Fetched extension info:", response.data);

      if (response.data && response.data.fileUrl) {
        // Extract fileUrl from the extension data
        const fileUrl = response.data.fileUrl;

        console.log("Starting download from:", fileUrl);

        // Start downloading the actual file
        const downloadResponse = await axios.get(fileUrl, {
          responseType: "blob" // Telling browser to treat it as a file
        });

        const blob = new Blob([downloadResponse.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        // can use a default name, or pull filename from API if available
        a.href = downloadUrl;
        a.download = response.data.title || "downloaded_file"; 
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        setError("Extension not found or missing file URL.");
      }
    } catch (err) {
      console.error("Error downloading extension:", err);
      setError("Failed to download. Please check Extension ID or server connection.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Download Service</h2>

      <Link to="/" className="btn btn-secondary mb-3">
        Back to Dashboard
      </Link>

      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Extension ID"
            value={extensionId}
            onChange={(e) => setExtensionId(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" onClick={handleDownload}>
          Download
        </Button>

        {error && (
          <div className="mt-3 text-danger">
            {error}
          </div>
        )}
      </Form>
    </Container>
  );
};

export default Download;

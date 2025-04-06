import React, { useState } from "react";
import axios from 'axios';

const Search = () => {
    const [id, setID] = useState('');
    const [extension, setExtension] = useState(null);

    const handleSearch = () => {
        axios.get(`https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/spec#/extensions/ExtensionController_getExtension/${id}`)
        .then(response => setExtension(response.data))
        .catch(error => console.error('Error fetching extension:', error));
    };

    return(
        <div className="container">
            <h2>Search Service</h2>
            <button className="btn btn-secondary mb-3" onClick={() => window.history.back()}>Back to dashboard</button>
            <div>
                <input
                type="text"
                placeholder="Enter Extension ID"
                value={id}
                onChange={(e) => setID(e.target.value)}
                className="form-control mb-2" />

                <button className="btn btn-primary" onClick={handleSearch}>Fetch Extension</button>
            </div>
            {extension && (
                <div className="mt-3">
                    <h4>Extension Details:</h4>
                    <p>ID: {extension.id}</p>
                    <p>Title: {extension.title}</p>
                    <p>Description: {extension.description}</p>
                    <p>Category: {extension.category}</p>
                    <p>Author: {extension.author}</p>
                    <p>Upload Date: {extension.uploaddate}</p>
                    <p>rating: {extension.rating}</p>
                    <p>Archived: {extension.archived ? 'yes' : 'No'}</p>
                </div>
            )}
        </div>

    );
      
};

export default Search;

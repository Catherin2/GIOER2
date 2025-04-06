import React, { useState } from "react";
import axios from 'axios';

const Download = () => {
    const [id, setId] = useState('');

    const handleDownload = () => {
        axios.get(`http://3.148.177.194/api/file/download/67ece64eae12078de2411abe/api/file/download/${id}`)    //`/api/file/download/${id}`
        .then(response =>{
            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href= url;
            link.setAttribute('download', `${id}.zip`);
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => console.error('Error downloading file:',error));

    };

    return (
        <div className="container">
            <h2>Download Service</h2>
            <button className="btn btn-secondary mb-3" onClick={() => window.history.back()}>Back to Dashboard</button>
            <div>
                <input 
                    type="text"
                    placeholder="Enter Extension ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="form-control mb-2" />

                < button className="btn btn-success" onClick={handleDownload}>Download</button>    
            </div>
        </div>
    );
}

export default Download;


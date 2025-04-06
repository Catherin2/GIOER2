import React, {useEffect, useState} from "react";
import axios from 'axios';

const Resource = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        /*axios.get('/api/extensions')*/
         axios.get('http://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/extensions')
        .then(Response => {
            console.log('API response:',Response.data)
           // setResources(Response.data);
           if(Array.isArray(Response.data)) {
            setResources(Response.data);
        } else {
          console.error('Invalid API response format:', Response.data);
        }
    })
      .catch(error => console.error('Error fetching resources:', error));
      }, []);
        
    return(
        <div className="container">
            <h2>Resource</h2>
            <button className="btn btn-secondary mb-3" onClick={() => window.history.back()}>Back to Dashboard</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Upload date</th>
                        <th>Rating</th>
                        <th>Archived</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(resources) && resources.map((res, index) => (
                            <tr key={index}>
                            <td>{res.id}</td>
                            <td>{res.title}</td>
                            <td>{res.category}</td>
                            <td>{res.author}</td>
                            <td>{res.uploadDate}</td>
                            <td>{res.rating}</td>
                            <td>{res.archived ? "yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    };

    export default Resource;

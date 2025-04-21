import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { SERVER_URL } from './Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';
import Upload from './Upload';
import Resource from './Resource';
import Creation from './Creation';
import Search from './Search';
import Download from './Download';
import ExtensionDetail from './ExtensionDetail';


function App() {
    //handle axios in one single page, note that i did that only for upload / download, you do the rest.
    const [extensions, setExtensions] = useState([]);

    const accessToken = sessionStorage.getItem('accessToken');

    const createNewExtension = async (title,description,category,tags) => {
      try{
          const resp = await axios.post(`${SERVER_URL}/extensions`,{
            title,
            description,
            category,
            tags
          },{
            headers: {
              'Authorization' : `Bearer ${accessToken}`
            }
          });
          
          const updateExtensionsState = [...extensions, resp.data];
          setExtensions(updateExtensionsState);
          toast.success('Extension created successfully!');
     
        }catch(error){
          // Handle server errors
              if(error.response) {
                console.error('Server error:', error.response.data);
                toast.error(error.response.data.message || 'Extension creation failed'); 
              }else if(error.request){
                // The request was made but no response was received
                console.error('Network error:', error.request);
                toast.error('Network error. Please try again.');
              }else{
                  //request Error
                  console.error('Error:', error.message);
                  toast.error('An unexpected error occurred.');
                }
          }
    };


  return (
    <div className='App'>
      <BrowserRouter>
         <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='/resource' element={<Resource/>}></Route>
        <Route path="/extensions/:id" element={<ExtensionDetail />}></Route>
        <Route path='/create' element={<Creation onCreate={createNewExtension}/>}></Route> 
        <Route path='/search' element={<Search/>}></Route>       
        <Route path='/download' element={<Download/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>         
      </Routes>   
      </BrowserRouter>
    </div>      
  );
}
export default App

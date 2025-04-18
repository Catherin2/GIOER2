import React, { useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';
import Upload from './Upload';
import Resource from './Resource';
import Creation from './Creation';
import Search from './Search';
import Download from './Download';

function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
         <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route> 

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='/resource' element={<Resource/>}></Route>
        <Route path="/extensions/:id" element={<ExtensionDetail />} />
        <Route path='/create' element={<Creation/>}></Route> 
        <Route path='/search' element={<Search/>}></Route>       
        <Route path='/download' element={<Download/>}></Route>             
      </Routes>   
      </BrowserRouter>
    </div>      
  );
}
export default App

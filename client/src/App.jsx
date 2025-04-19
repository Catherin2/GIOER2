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
<<<<<<< HEAD
import Dashboard2 from './Dashboard2';
=======
import ExtensionDetail from './ExtensionDetail';
>>>>>>> 2039f78e02a51693946ac811eab4209280ebf6f4

function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
         <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='/resource' element={<Resource/>}></Route>
        <Route path="/extensions/:id" element={<ExtensionDetail />} />
        <Route path='/create' element={<Creation/>}></Route> 
        <Route path='/search' element={<Search/>}></Route>       
        <Route path='/download' element={<Download/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard2' element={<Dashboard2/>}></Route>              
      </Routes>   
      </BrowserRouter>
    </div>      
  );
}
export default App

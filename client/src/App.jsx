import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import ServiceHomeUI from './ServiceHomeUI';
import Navbar from './components/Navbar';
import Upload from './Upload';
import Resource from './Resource';
import Creation from './Creation';




function App() {
  
  return (
    <div className='App'>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login/:id' element={<Login/>}></Route>
        <Route path='/service' element={<ServiceHomeUI/>}></Route>
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='/resource' element={<Resource/>}></Route>
        <Route path='/create' element={<Creation/>}></Route>
      </Routes>
      
      </BrowserRouter>

    </div>
        
  );
}

export default App

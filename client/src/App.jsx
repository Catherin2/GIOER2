import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';
import Upload from './Upload';




function App() {
  
  return (
    <div className='App'>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login/:id' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/upload' element={<Upload/>}></Route>
      </Routes>
      
      </BrowserRouter>

    </div>
        
  );
}

export default App

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';




function App() {
  
  return (
    <div className='App'>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
      
      </BrowserRouter>

    </div>
        
  );
}

export default App

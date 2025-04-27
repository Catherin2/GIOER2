import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
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
import ExtensionDetail from './ExtensionDetail';
import NotFoundPage from './components/NotFoundPage'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
   
  return (
    <div className='App'>
      <BrowserRouter>
         <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/resource' element={<Resource/>}></Route>
        <Route path="/extensions/:id" element={<ExtensionDetail />}></Route>
        <Route path='/create' element={<Creation/>}></Route> 
        <Route path='/search' element={<Search/>}></Route>       
        <Route path='/download' element={<Download/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route> 
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='*' component={NotFoundPage} /> {/* Catch-all route for 404s */}         
      </Routes>   
      <ToastContainer
      position= "top-center"
      autoClose={1000}
      hideProgressBar={true}
      closeOnClick  
      />
      </BrowserRouter>
    </div>      
  );
}
export default App

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var response = await axios.post('https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/users', {name, email, password}, 
            {headers: {'Content-Type': 'application/json'
          }
        }) 
      console.log(response.data);
      // Handle successful registration
      toast.success(response.data.message.join(',') || 'Registration successful!');
      navigate('/login');
    } catch (error) {
      // Handle server errors
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server error:', error.response.data.message);
        toast.error(error.response.data.message || 'Registration failed'); // Display server error
      } else if (error.request) {
        // The request was made but no response 
        console.error('Network error:', error.request);
        toast.error('Network error. Please try again.');
      } else {
        // request triggered Error
        console.error('Error:', error.message);
        toast.error('An unexpected error occurred.');
      }
    }
    
  }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100"> 
      <div className="bg-white p-3 rounded w-25">
      <h2>Register</h2>
      <ToastContainer position="top-center" /> {/*ToastContainer */}
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text">
                        <strong>Name</strong>
                    </label>
                    <input
                    type= "text"
                    placeholder="name..."
                    autoComplete="off"
                    name="name"
                    className="form-control rounded-0"
                    onChange={(e) => setName(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                    type= "email"
                    placeholder="email..."
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input
                    type= "password"
                    placeholder="password..."
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                </div>             
                <button type="submit" className="btn btn-success w-100 rounded">Register</button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-default boarder w-100 bg-light rounded-0 text-decoration-none">Login</Link>           
        </div>
    </div>   
    );
}

export default Register;

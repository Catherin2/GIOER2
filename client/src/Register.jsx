import {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });   
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/users', formData, 
            {headers: {'Content-Type': 'application/json'
          }
        })   
          (response.data);
          // Handle successful login
          toast.success('Registration successful!');
          navigate('/login')
        } catch (error) {
          // Handle server errors
          if (error.response) {
            console.error('Server error:', error.response.data);
            toast.error(error.response.data.message || 'Login failed'); 
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error:', error.request);
            toast.error('Network error. Please try again.');
          } else {
            //request Error
            console.error('Error:', error.message);
            toast.error('An unexpected error occurred.');
          }
        }
      }
        return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <ToastContainer position="top-center" /> {/*ToastContainer */}
        <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
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
                    value={formData.username}
                          onChange={(e) =>
                           setFormData({ ...formData, username: e.target.value })
                          }
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
                    value={formData.email}
                          onChange={(e) =>
                           setFormData({ ...formData, email: e.target.value })
                          }
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
                    value={formData.password}
                          onChange={(e) =>
                           setFormData({ ...formData, password: e.target.value })
                          }
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
import {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const navigate = useNavigate();
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           response = await axios.post('https://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/users/login', formData, 
            {headers: {'Content-Type': 'application/json'
          }
        })   
        console.log(response.data);
          // Handle successful login
          toast.success('Login successful!');
          navigate('/dashboard');
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
    <div className="d-flex justify-content-center align-items-center bg-secondary
    vh-100">       
          <div className="bg-white p-3 rounded w-25">
                   <h2>Login</h2>
                   <ToastContainer position="top-center" /> {/*ToastContainer */}
                   <form onSubmit={handleSubmit}>
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
                           name="password"
                           className="form-control rounded-0"
                           value={formData.password}
                            onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                          }
                          required/>      
                       </div>         
                       <button type="submit" className="btn btn-success w-100 rounded">Login</button>
                       </form>  
                       <p>Create an Account!</p>
                <Link to="/register" className="btn btn-default boarder w-100 bg-light rounded-0 text-decoration-none">Register</Link>                   
               </div>
           </div>
 );    
}
export default Login;
import {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
    



function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate

    const loginUser = async (e) =>{
        e.prevenDefault();
        axios.post('http://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api', {email, password})
        .then(result => {console.log(result)
            navigate('/dashboard')
        })
        .catch(err => console.log(err))
    }



 return(

    <div className="d-flex justify-content-center align-items-center bg-secondary
    vh-100">       
          <div className="bg-white p-3 rounded w-25">
                   <h2>Login</h2>
                   <form onSubmit={loginUser}>
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
                       <button type="submit" className="btn btn-success w-100 rounded">Login</button>
                       </form>  
                       <p>Create an Account!</p>
                <Link to="/register" className="btn btn-default boarder w-100 bg-light rounded-0 text-decoration-none">Register</Link>                   
               </div>
           </div>
 );
    
}

export default Login;
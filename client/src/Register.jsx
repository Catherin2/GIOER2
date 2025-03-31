import {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const registerUser = async (e) =>{
        e.preventDefault();
        axios
        .post('http://gioer-cfc6bkewatd5angv.canadacentral-01.azurewebsites.net/api/users/'
         ,{name, email, password},
             {headers: {'Content-Type': 'application/json'
        }
      })
        .then(result => {console.log(result);
            navigate('/login/:id');
            window.location.reload();

        })
        .catch(err => console.log(err));
        
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form onSubmit={registerUser}>
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
                <Link to="/login/:id" className="btn btn-default boarder w-100 bg-light rounded-0 text-decoration-none">Login</Link>
            
        </div>
    </div>   
    );
}

export default Register;
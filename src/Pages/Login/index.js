import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/login", { email, password })
        .then(res => console.log(res))
        .catch(err => console.log(err)); 
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-3 bg-white w-25 shadow rounded">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Email" 
                            className="form-control" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Password" 
                            className="form-control" 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Login</button>
                </form>    
            </div>        
        </div>
    );
}
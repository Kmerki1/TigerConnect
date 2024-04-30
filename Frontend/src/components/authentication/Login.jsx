import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/authentication.css"

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here
        navigate('/profile');
    };

    return (
        <div className="container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input type="text" id="Email" name="Email" required/>
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" name="Password" required/>
                <input type="submit" id="submit" name="submit"/>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
                <p>Forgot your password? <a href="/forgot-password">Click Here</a></p>
            </form>
        </div>
    );
}

export default Login;
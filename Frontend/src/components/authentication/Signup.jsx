import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/authentication.css"

function Signup() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform signup logic here
        navigate('/profile');
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Username">Username</label>
                <input type="text" id="Username" name="Username" required/>
                <label htmlFor="Email">Email</label>
                <input type="text" id="Email" name="Email" required/>
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" name="Password" required/>
                <label htmlFor="VerPass">Verify Password</label>
                <input type="password" id="VerPass" name="VerPass" required/>
                <input type="submit" id="submit" name="submit"/>
                <p>
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;
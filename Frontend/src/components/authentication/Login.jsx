import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/authentication.css";
import CONFIG from "../../../../config";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${CONFIG.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Login successful!');
                localStorage.setItem('token', data.token);
                navigate('/profile');
            } else {
                throw new Error(data.message || "Failed to login");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input onChange={handleChange} type="text" id="Email" name="email" required/>
                <label htmlFor="Password">Password</label>
                <input onChange={handleChange} type="password" id="Password" name="password" required/>
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

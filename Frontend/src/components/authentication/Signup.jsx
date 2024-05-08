import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/authentication.css"
import CONFIG from "../../../../config";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, " ", value)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const response = await fetch(`${CONFIG.API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.status === 201) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                throw new Error(data.message || "Failed to register");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display Name</label>
                <input onChange={handleChange} type="text"  name="displayName" required/>
                <label htmlFor="username">Username</label>
                <input onChange={handleChange} type="text" name="username" required/>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} type="text" name="email" required/>
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" name="password" required/>
                <label htmlFor="verPass">Verify Password</label>
                <input type="password" name="verpass" required/>
                <input type="submit" name="submit"/>
                <p>
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;
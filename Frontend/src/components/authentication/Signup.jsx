import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/authentication.css"
import CONFIG from "../../../../config";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
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
                navigate('/profile');
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
                <label htmlFor="Username">Username</label>
                <input onChange={handleChange} type="text" id="Username" name="username" required/>
                <label htmlFor="Email">Email</label>
                <input onChange={handleChange} type="text" id="Email" name="email" required/>
                <label htmlFor="Password">Password</label>
                <input onChange={handleChange} type="password" id="Password" name="password" required/>
                <label htmlFor="VerPass">Verify Password</label>
                <input type="password" id="VerPass" name="verpass" required/>
                <input type="submit" id="submit" name="submit"/>
                <p>
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here
        navigate('/profile');
    };

    return (
        <div>
            <h1>Log In</h1>
            <div className="logInMenu">
                <form onSubmit={handleSubmit}>
                    <p className="Labels">Email</p>
                    <input type="text" id="Email" name="Email" required />
                    <br />
                    <p className="Labels">Password</p>
                    <input type="password" id="Password" name="Password" required />
                    <br />
                    <input type="submit" id="submit" name="submit" value="Submit" />
                    <br />
                    <p>
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                    <br />
                    <p>Forget your password?</p>
                    <p>
                        <a href="/forgot-password">Click Here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
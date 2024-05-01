import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/signup.css';

function Signup() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform signup logic here
        navigate('/home');
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <div className="signUpMenu">
                <form onSubmit={handleSubmit}>
                    <p className="Labels">Username</p>
                    <input type="text" id="Username" name="Username" required />
                    <br />
                    <p className="Labels">Email</p>
                    <input type="text" id="Email" name="Email" required />
                    <br />
                    <p className="Labels">Password</p>
                    <input type="password" id="Password" name="Password" required />
                    <br />
                    <p className="Labels">Verify Password</p>
                    <input type="password" id="VerPass" name="VerPass" required />
                    <br />
                    <input type="submit" id="submit" name="submit" value="Submit" />
                    <br />
                    <p>
                        Already have an account? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
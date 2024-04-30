import React from 'react';
import "../../styles/authentication.css"

function ForgotPassword() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform forgot password logic here
    };

    return (
        <div className="container">
            <h2>Forgot Password</h2>
            <p>Please enter your email address to reset your password</p>
            <form id="forgot_password_form" onSubmit={handleSubmit}>
                <label htmlFor="towson_email">Towson Email</label>
                <input type="email" id="towson_email" name="Towson Email" required />
                <input type="submit" id="submit" name="submit"/>
            </form>
        </div>
    );
}

export default ForgotPassword;
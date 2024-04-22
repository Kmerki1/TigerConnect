import React from 'react';

function ForgotPassword() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform forgot password logic here
    };

    return (
        <div className="forgot_password_page">
            <h1 style={{ textAlign: 'center' }}>Forgot Password</h1>
            <p style={{ textAlign: 'center' }}>
                Please enter your email address to reset your password
            </p>
            <form id="forgot_password_form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" style={{ textAlign: 'center' }}>
                        Towson Email:
                    </label>
                    <input type="email" id="towson_email" name="Towson Email" required />
                </div>
                <button type="submit" className="submit_button">
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
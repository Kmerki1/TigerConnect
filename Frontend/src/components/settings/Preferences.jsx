import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getToken, getUserId} from '../../utils/auth.js';
import "../../styles/settings.css";
import CONFIG from "../../../../config";

function Preferences() {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState("");

    const handleBackToSettings = () => {
        navigate("../settings")
    };

    const handleImageUpload = ({target}) => {
        const file = target.files[0]
        if (file) {
            const fileType = file.type;
            if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg') {
                setProfilePic(file);
                setError("");
            } else {
                setProfilePic(null);
                setError("Please upload a PNG or JPG image.");
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const token = getToken();
            const formData = new FormData();
            formData.append('profile_pic', profilePic);

            const response = await fetch(`${CONFIG.API_URL}/users/update-profile-pic`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                fetchUserData(); // Update profile picture in the frontend
                console.log('Profile picture updated successfully');
            } else {
                throw new Error('Failed to update profile picture');
            }
        } catch (error) {
            console.error('Error updating profile picture:', error.message);
        }
    };

    const fetchUserData = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${CONFIG.API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.text();
                // Update profile picture in the frontend
                setProfilePic(userData.profile_pic);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };


    return (
        <div id="preferences-body">
            <h1 className="main-header">Preferences</h1>
            <h2 className="sub-header">Profile Picture</h2>
            <hr />
            <p>Add a photo to let all of us see a new side of you!</p>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br />
            <button className="profile-pic-input" onClick={handleSubmit}>Upload</button>
            <h2 className="sub-header">Banner</h2>
            <hr />
            <p>Adjust the background of your profile to give people a better idea of who you are.</p>
            <p>&gt;Figure out image upload.</p>
            <h2 className="sub-header">Color Scheme</h2>
            <hr />
            <p>If this TU's not for you, change how you experience our website.</p>
            <p>&gt;Figure out color selection and stuff (maybe JS), including dark mode.</p>
            <h2 className="sub-header">Music</h2>
            <hr />
            <p>Toggle music settings or set your own playlist.</p>
            <p>&gt;Optionally add JS for music.</p>
            <h2 className="sub-header">Font Size</h2>
            <hr />
            <p>
                Whether you've got your face to the glass or glasses bigger than your face, we want to
                accommodate all types of eyesight.
            </p>
            <p>&gt;Add JS for changing font sizes.</p>
            <h2 className="sub-header">Notifications</h2>
            <hr />
            <p>Alter how you receive notifications, emails, and other ways to stay updated.</p>
            <p>&gt;Uhh.</p>
            <br />
            <button onClick={handleBackToSettings}>&lt;&lt;Back to Settings&lt;&lt;</button>
        </div>
    );
}

export default Preferences;
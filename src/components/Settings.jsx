import React from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();

    const handlePrivacySecurityClick = () => {
        navigate('/settings/privacy-security');
    };

    const handlePreferencesClick = () => {
        navigate('/settings/preferences');
    };

    return (
        <div>
            <h1 className="main-header">Settings</h1>
            <hr />
            <p>
                This is the master settings page, for reaching any and all settings you
                want to adjust.
            </p>
            <h2 className="sub-header">Privacy/Security Settings</h2>
            <hr />
            <p>Change your private information and who sees what.</p>
            <br />
            <p>Adjust your:</p>
            <ul>
                <li>Username</li>
                <li>Phone Number</li>
                <li>Email</li>
                <li>Gender</li>
                <li>Birth Date</li>
                <li>Age</li>
                <li>Password</li>
                <li>Blacklist</li>
            </ul>
            <button onClick={handlePrivacySecurityClick}>
                &gt;&gt;Go to Privacy &amp; Security&gt;&gt;
            </button>
            <h2 className="sub-header">Preferences</h2>
            <hr />
            <p>Change how you interact with the website.</p>
            <br />
            <p>Adjust your:</p>
            <ul>
                <li>Profile Picture</li>
                <li>Banner</li>
                <li>Music</li>
                <li>Color Scheme/Dark Mode</li>
                <li>Font Size</li>
                <li>Notifications</li>
            </ul>
            <button onClick={handlePreferencesClick}>
                &gt;&gt;Go to Preferences&gt;&gt;
            </button>
        </div>
    );
}

export default Settings;
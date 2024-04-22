import React from 'react';
import {useNavigate} from "react-router-dom";

function Preferences() {
    const navigate = useNavigate();
    const handleBackToSettings = () => {
        navigate("../settings")
    };

    return (
        <div id="preferences-body">
            <h1 className="main-header">Preferences</h1>
            <h2 className="sub-header">Profile Picture</h2>
            <hr />
            <p>Add a photo to let all of us see a new side of you!</p>
            <p>&gt;Figure out image upload.</p>
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
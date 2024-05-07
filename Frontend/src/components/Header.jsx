import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';


function Header() {
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout)  {
            // Peform logout action here
        }
    };

    return (
        <header>
            <h1>TigerConnect</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/group-chats">Group Chats</Link>
                    </li>
                    <li>
                        <Link to="/login">Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
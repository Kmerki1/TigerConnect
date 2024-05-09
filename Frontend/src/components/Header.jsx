import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import '../styles/header.css';


function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout)  {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return (
        <header>
            <h1>TigerConnect</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/group-chats">Group Chats</Link>
                    </li>
                    <li>
                        <a onClick={handleLogout}>Log out</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
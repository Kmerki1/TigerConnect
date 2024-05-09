import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import GroupChats from './components/chat/GroupChats';
import GroupChat from './components/chat/GroupChat.jsx';
import DirectMessages from "./components/chat/DirectMessages.jsx";
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import ForgotPassword from './components/authentication/ForgotPassword';
import Settings from './components/settings/Settings';
import PrivacyAndSecurity from "./components/settings/Privacy&Security.jsx";
import Preferences from "./components/settings/Preferences.jsx";
import PrivateRoute from "./PrivateRoute";

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<PrivateRoute><Layout><Home/></Layout></PrivateRoute>}/>
                    <Route path="/profile" element={<PrivateRoute><Layout><Profile/></Layout></PrivateRoute>}/>
                    <Route path="/dm/:id" element={<PrivateRoute><Layout><DirectMessages/></Layout></PrivateRoute>}/>
                    <Route path="/group-chats" element={<PrivateRoute><Layout><GroupChats/></Layout></PrivateRoute>}/>
                    <Route path="/chat/:id" element={<PrivateRoute><Layout><GroupChat/></Layout></PrivateRoute>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/settings" element={<PrivateRoute><Layout><Settings/></Layout></PrivateRoute>}/>
                    <Route path="/settings/privacy-security" element={<PrivateRoute><Layout><PrivacyAndSecurity/></Layout></PrivateRoute>}/>
                    <Route path="/settings/preferences" element={<PrivateRoute><Layout><Preferences/></Layout></PrivateRoute>}/>
                </Routes>
            </div>
        </Router>
    );
}

function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="body-wrapper">{children}</div>
            <Footer />
        </>
    );
}

export default App;
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

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Layout><Home/></Layout>}/>
                    <Route path="/profile" element={<Layout><Profile/></Layout>}/>
                    <Route path="/dm/:id" element={<Layout><DirectMessages/></Layout>}/>
                    <Route path="/group-chats" element={<Layout><GroupChats/></Layout>}/>
                    <Route path="/chat/:id" element={<Layout><GroupChat/></Layout>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/settings" element={<Layout><Settings/></Layout>}/>
                    <Route path="/settings/privacy-security" element={<Layout><PrivacyAndSecurity/></Layout>}/>
                    <Route path="/settings/preferences" element={<Layout><Preferences/></Layout>}/>
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
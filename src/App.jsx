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
                <Header/>
                <div className="body-wrapper">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/dm/:id" element={<DirectMessages/>}/>
                        <Route path="/group-chats" element={<GroupChats/>}/>
                        <Route path="/chat/:id" element={<GroupChat/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/settings/privacy-security" element={<PrivacyAndSecurity/>}/>
                        <Route path="/settings/preferences" element={<Preferences/>}/>
                    </Routes>
                </div>
            <Footer/>
            </div>
        </Router>
    );
}

export default App;
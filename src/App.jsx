import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import GroupChats from './components/GroupChats';
import GroupChat from './components/GroupChat.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Settings from './components/Settings';
import DirectMessages from "./components/DirectMessages.jsx";

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
                    </Routes>
                </div>
            <Footer/>
            </div>
        </Router>
    );
}

export default App;
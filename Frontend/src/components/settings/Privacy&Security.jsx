import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivacyAndSecurity() {
    const [newUsername, setNewUsername] = useState('');
    const [confirmUsername, setConfirmUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [emails, setEmails] = useState([]);
    const [newPhone, setNewPhone] = useState('');
    const [phones, setPhones] = useState([]);
    const [birthDay, setBirthDay] = useState('1');
    const [birthMonth, setBirthMonth] = useState('1');
    const [birthYear, setBirthYear] = useState('1920');
    const [showAge, setShowAge] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmails = JSON.parse(localStorage.getItem('emails')) || [];
        setEmails(savedEmails);

        const savedPhones = JSON.parse(localStorage.getItem('phones')) || [];
        setPhones(savedPhones.map(formatPhoneNumberForDisplay));
    }, []);

    const changeUsername = () => {
        if (newUsername.trim() === '' || confirmUsername.trim() === '') {
            alert('Please fill in both fields to complete this action.');
            return false;
        }
        if (newUsername !== confirmUsername) {
            alert('Both fields must match to complete this action.');
            return false;
        }
        if (newUsername === confirmUsername && newUsername.trim() !== '') {
            alert('Username successfully changed!');
            return true;
        } else {
            alert('An unexpected error occurred. Username could not securely be changed.');
            return false;
        }
    };

    const changePassword = () => {
        if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
            alert('Please fill in all fields to complete this action.');
            return false;
        }
        if (newPassword !== confirmPassword) {
            alert('New password fields do not match.');
            return false;
        }
        if (newPassword === confirmPassword && oldPassword.trim() !== '' && newPassword.trim() !== '') {
            alert('Password successfully changed!');
            return true;
        } else {
            alert('An unexpected error occurred. Password could not securely be changed.');
            return false;
        }
    };

    const addEmail = () => {
        const email = newEmail.trim();
        if (isValidEmail(email)) {
            if (emails.length < 9) {
                if (!isDuplicateEmail(email)) {
                    setEmails([...emails, email]);
                    setNewEmail('');
                    saveEmails([...emails, email]);
                } else {
                    alert('This email address is already in the list.');
                }
            } else {
                alert('You can only have up to 10 email addresses.');
            }
        } else {
            alert('Please enter a valid email address.');
        }
    };

    const removeEmail = () => {
        const updatedEmails = emails.filter((email) => !email.checked);
        setEmails(updatedEmails);
        saveEmails(updatedEmails);
    };

    const addPhone = () => {
        const phone = newPhone.replace(/\D/g, '');
        if (isValidPhoneNumber(phone) && !isDuplicatePhoneNumber(phone)) {
            const formattedPhone = formatPhoneNumberForDisplay(phone);
            setPhones([...phones, formattedPhone]);
            setNewPhone('');
            savePhones([...phones, phone]);
        } else if (isDuplicatePhoneNumber(phone)) {
            alert('This phone number is already in the list.');
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    const removePhone = () => {
        const updatedPhones = phones.filter((phone) => !phone.checked);
        setPhones(updatedPhones);
        savePhones(updatedPhones);
    };

    const calculateAge = () => {
        const selectedDay = parseInt(birthDay, 10);
        const selectedMonth = parseInt(birthMonth, 10);
        const selectedYear = parseInt(birthYear, 10);
        const isValidDate = isValidSelectedDate(selectedYear, selectedMonth, selectedDay);

        if (!isValidDate) {
            console.log('Invalid date selected!');
            return '';
        }

        const birthDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `Your current age is ${age} years.`;
    };

    const isValidSelectedDate = (year, month, day) => {
        const selectedDate = new Date(year, month - 1, day);
        return (
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month - 1 &&
            selectedDate.getDate() === day
        );
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
    };

    const isDuplicateEmail = (email) => {
        return emails.includes(email);
    };

    const saveEmails = (updatedEmails) => {
        localStorage.setItem('emails', JSON.stringify(updatedEmails));
    };

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const isDuplicatePhoneNumber = (phone) => {
        return phones.includes(formatPhoneNumberForDisplay(phone));
    };

    const formatPhoneNumberForDisplay = (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };

    const savePhones = (updatedPhones) => {
        localStorage.setItem('phones', JSON.stringify(updatedPhones));
    };

    const handleBackToSettings = () => {
        navigate("../settings")
    };

    return (
        <div id="privacy-and-security-body">
            <h1 className="main-header">Privacy &amp; Security</h1>
            <h2 className="sub-header">Username</h2>
            <hr />
            <p>Adjust your username in the event you forgot, or just to fit how you feel.</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                changeUsername();
            }}>
                <input
                    type="text"
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Change Username"
                />
                <br />
                <input
                    type="text"
                    id="confirmUsername"
                    value={confirmUsername}
                    onChange={(e) => setConfirmUsername(e.target.value)}
                    placeholder="Confirm Username"
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
            {/* ... */}
            <h2 className="sub-header">Password</h2>
            <hr />
            <p>
                This is the password to your whole account! By default, this should be your password to your
                school account. Make sure it's both complex and memorable, and remember to keep it secret,
                keep it safe!
            </p>
            <form onSubmit={(e) => {
                e.preventDefault();
                changePassword();
            }}>
                <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter Old Password"
                />
                <br />
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                />
                <br />
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
            {/* ... */}
            <h2 className="sub-header">Email</h2>
            <hr />
            <p>
                By default, your school email is your main email, but if you want multiple recovery emails,
                adjust it here.
            </p>
            <form id="emailForm">
                <input
                    type="email"
                    id="newEmail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Add Email Address"
                />
                <button type="button" onClick={addEmail}>
                    Add Email
                </button>
                <ul>
                    <li>jdoe1@students.towson.edu (Towson Email)</li>
                </ul>
                <ul id="emailList">
                    {emails.map((email, index) => (
                        <li key={index}>
                            <input type="checkbox" />
                            {email}
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={removeEmail}>
                    Remove Selected Emails
                </button>
            </form>
            {/* ... */}
            <h2 className="sub-header">Phone Number</h2>
            <hr />
            <p>
                Add a recovery phone number so that we can text you if you have trouble with your password.
            </p>
            <form id="phoneForm">
                <input
                    type="tel"
                    id="newPhone"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                />
                <button type="button" onClick={addPhone}>
                    Add Phone Number
                </button>
                <ul id="phoneList">
                    {phones.map((phone, index) => (
                        <li key={index}>
                            <input type="checkbox" />
                            {phone}
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={removePhone}>
                    Remove Selected Numbers
                </button>
            </form>
            {/* ... */}
            <h2 className="sub-header">Birthday &amp; Age</h2>
            <hr />
            <p>All students and faculty are required to confirm they're legal adults before joining TigerText.</p>
            <label htmlFor="birthdate">Select your birthdate:</label>
            <select
                id="birthMonth"
                className="spinner"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
            >
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <select
                id="birthDay"
                className="spinner"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
            >
                {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            <select
                id="birthYear"
                className="spinner"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
            >
                {Array.from({ length: 2010 - 1920 + 1 }, (_, i) => (
                    <option key={i} value={1920 + i}>
                        {1920 + i}
                    </option>
                ))}
            </select>
            <br />
            <span id="ageDisplay">{showAge ? calculateAge() : ''}</span>
            <br />
            <input
                type="checkbox"
                id="showAgeCheckbox"
                checked={showAge}
                onChange={(e) => setShowAge(e.target.checked)}
            />
            <label htmlFor="showAgeCheckbox">Show age</label>
            <br />
            <br />
            <button type="button">Submit</button>

            <h2 className="sub-header">Blacklist</h2>
            <hr />
            <p>
                It's important to report harassing and offensive behavior, but if you'd like to filter others
                out yourself, you can block them from seeing or messaging you.
            </p>
            <br />
            <button onClick={handleBackToSettings}>&lt;&lt;Back to Settings&lt;&lt;</button>
        </div>
    );
}

export default PrivacyAndSecurity;
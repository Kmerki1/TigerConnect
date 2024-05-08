import { jwtDecode } from 'jwt-decode';

function getToken() {
    return localStorage.getItem('token');
}

function getUserId() {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

export { getToken, getUserId };

import React from 'react'
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {getUserId} from "./utils/auth";

function PrivateRoute({ children }) {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(userId)
    useEffect(() => {
        const checkUser = async () => {
            const user = await getUserId();
            setUserId(user);
            setIsLoading(false);
        };
        checkUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return userId ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
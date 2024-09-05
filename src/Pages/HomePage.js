import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../Components/TodoList";

const HomePage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) {
            setLoggedInUser(user);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login')
    }

    return (
        <>
            {loggedInUser ? (
                <>
                    <div className="container">
                        <header className="flex align-center justify-between">
                            <p>To Do App</p>
                            <div className="flex align-center">
                                <p>Welcome, {loggedInUser.email}!</p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </header>
                        <TodoList />
                    </div>
                </>
            ) : (
                <>
                    <div className="container">

                        <p>To Do App</p>
                        <div>
                            <a href="/login">Login</a>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default HomePage;
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
                    <div className="header_main">
                        <div className="container">
                            <header className="header flex align-center justify-between">
                                <p className="w-30 todo_logo poppins-semibold">To Do App</p>
                                <div className="todo_right flex align-center w-70 justify-end">
                                    <p>Welcome, <strong>{loggedInUser.email}!</strong></p>
                                    <button onClick={handleLogout} className="logout_btn">Logout</button>
                                </div>
                            </header>
                        </div>
                    </div>

                    <TodoList />

                </>
            ) : (
                <>
                    <div className="header_main">
                        <div className="container">
                            <header className="flex align-center justify-between">
                                <p className="w-30">To Do App</p>
                                <div className="flex align-center w-70 justify-end">
                                    <button onClick={() => navigate('/login')} className="logout_btn">Login</button>
                                </div>
                            </header>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default HomePage;
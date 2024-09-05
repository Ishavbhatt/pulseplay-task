import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLoginForm = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem("users"));

        const user = storedUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <>

            <h3>Login</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleLoginForm}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage;
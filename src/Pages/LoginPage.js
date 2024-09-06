import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Pages.module.scss';

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
            <div className={styles.login_page}>
                <form onSubmit={handleLoginForm} autoComplete="off">
                    <h3 className="poppins-semibold">Login</h3>
                    {error && <p style={{ color: "red" }} className="poppins-regular">{error}</p>}

                    <div className={styles.form_group}>
                        <label className="poppins-regular">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmmail(e.target.value)}
                            autoComplete="off"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className="poppins-regular">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                            placeholder="Your Password"

                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;
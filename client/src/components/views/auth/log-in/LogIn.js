import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../contexts/AuthContext";

import "../Auth.css";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setIsLoggedIn, setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        // Reset err msg
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const data = await response.json();

            // Save token and user id
            localStorage.setItem("authToken", data.accessToken);
            localStorage.setItem("userId", data.userId);
            // Update Auth Context
            setIsLoggedIn(true);
            setUserId(data.userId);
            // Push user to Dashboard page after successful log in
            navigate("/dashboard/subscriptions");
            
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main className="auth login">
            <form onSubmit={handleSubmit} className="auth__form">
                <div className="title--highlight-wrapper">
                    <h1 className="auth__title title--highlight">Log In</h1>
                </div>
                {error ? <p className="error">{error}</p> : null}
                <div className="auth__form__group">
                    <label htmlFor="email" className="auth__form__label">Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="auth__form__input" required/>
                </div>
                <div className="auth__form__group">
                    <label htmlFor="password" className="auth__form__label">Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" className="auth__form__input" required/>
                </div>
                <button type="submit" className="auth__form__submit-btn cta-btn">Submit</button>
            </form>
        </main>
    );
}

export default LogIn;

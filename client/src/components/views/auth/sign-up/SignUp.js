import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Auth.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        // Reset err msg
        setError("");

        try {
            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            navigate("/auth/log-in");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main className="auth signup">
            <form onSubmit={handleSubmit} className="auth__form">
                <div className="title--highlight-wrapper">
                    <h1 className="auth__title title--highlight">
                        Create a New Account
                    </h1>
                </div>
                {error ? <p className="error">{error}</p> : null}
                <div className="auth__form__group">
                    <label htmlFor="username" className="auth__form__label">
                        Username
                    </label>
                    <input
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        className="auth__form__input"
                        required
                    />
                </div>
                <div className="auth__form__group">
                    <label htmlFor="email" className="auth__form__label">
                        Email
                    </label>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        className="auth__form__input"
                        required
                    />
                </div>
                <div className="auth__form__group">
                    <label htmlFor="password" className="auth__form__label">
                        Password
                    </label>
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        className="auth__form__input"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="auth__form__submit-btn cta-btn"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}

export default SignUp;

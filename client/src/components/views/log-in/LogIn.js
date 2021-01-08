import { useState } from "react";

import "./LogIn.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main className="auth login">
            <h1 className="auth__title">Log In</h1>
            <form onSubmit={handleSubmit} className="auth__form">
                <div className="auth__form__group">
                    <label htmlFor="email" className="auth__form__label">Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="auth__form__input" required/>
                </div>
                <div className="auth__form__group">
                    <label htmlFor="password" className="auth__form__label">Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" className="auth__form__input" required/>
                </div>
                <button type="submit" className="auth__form__submit-btn">Submit</button>
            </form>
        </main>
    );
}

export default Login;

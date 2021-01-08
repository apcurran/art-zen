import { useState } from "react";

import "./Signup.css";

function Signup() {
    const [username, setUsername] = useState("");
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
                    username,
                    email,
                    password
                })
            });
            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main className="signup">
            <h1 className="signup__title">Create a New Account</h1>
            <form onSubmit={handleSubmit} className="signup__form">
                <div className="signup__form__group">
                    <label htmlFor="username" className="signup__form__label">Username</label>
                    <input onChange={(event) => setUsername(event.target.value)} type="text" name="username" id="username" className="signup__form__input" required/>
                </div>
                <div className="signup__form__group">
                    <label htmlFor="email" className="signup__form__label">Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="signup__form__input" required/>
                </div>
                <div className="signup__form__group">
                    <label htmlFor="password" className="signup__form__label">Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" className="signup__form__input" required/>
                </div>
                <button type="submit" className="signup__form__submit-btn">Submit</button>
            </form>
        </main>
    );
}

export default Signup;

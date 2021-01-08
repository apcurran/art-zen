import { useState, useEffect } from "react";

import "./Signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className="signup">
            <h1 className="signup__title">Create a New Account</h1>
            <form className="signup__form">
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

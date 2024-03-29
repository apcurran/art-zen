import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

function SignedInLinks() {
    const { setIsLoggedIn, setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");

        setIsLoggedIn(false);
        setUserId(0);
        
        navigate("/");
    }

    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink to="/about" className="nav__link">About</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/dashboard/subscriptions" className="nav__link">Dashboard</NavLink>
            </li>
            <li className="nav__item">
                <button onClick={handleLogOut} className="log-out-btn">Log Out</button>
            </li>
        </ul>
    );
}

export default SignedInLinks;

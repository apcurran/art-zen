import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

function SignedInLinks() {
    const { setIsLoggedIn } = useContext(AuthContext);

    function handleLogOut() {
        localStorage.removeItem("authToken");

        setIsLoggedIn(false);
    }

    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink to="/about" className="nav__link">About</NavLink>
            </li>
            <li className="nav__item">
                <button onClick={handleLogOut}>Log Out</button>
            </li>
        </ul>
    );
}

export default SignedInLinks;

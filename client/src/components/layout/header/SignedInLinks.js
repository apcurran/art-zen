import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

function SignedInLinks() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    function handleLogOut() {
        localStorage.removeItem("authToken");

        setIsLoggedIn(false);
        history.push("/");
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

import { NavLink } from "react-router-dom";

function SignedInLinks() {
    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink to="/about" className="nav__link">About</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/users/logout" className="nav__link">Log Out</NavLink>
            </li>
        </ul>
    );
}

export default SignedInLinks;

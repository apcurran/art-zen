import { NavLink } from "react-router-dom";

function SignedOutLinks() {
    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink to="/about" className="nav__link">About</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/users/login" className="nav__link">Log In</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/users/signup" className="nav__link">Join</NavLink>
            </li>
        </ul>
    );
}

export default SignedOutLinks;

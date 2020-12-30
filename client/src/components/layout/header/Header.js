import { NavLink } from "react-router-dom";

import "./Header.css";
import Logo from "../../../assets/images/logo-finished-opt.svg";
import SignedOutLinks from "./SignedOutLinks";

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <NavLink to="/" className="nav__logo-link">
                    <img className="nav__logo-img" src={Logo} alt="Art Zen logo"/>
                </NavLink>
                <SignedOutLinks />
            </nav>
        </header>
    );
}

export default Header;

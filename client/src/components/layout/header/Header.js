import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import "./Header.css";
import Logo from "./imgs/logo-finished-opt.svg";
import SearchBar from "./SearchBar";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

function Header() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <header className="header">
            <nav className="nav">
                <NavLink to="/" className="nav__logo-link">
                    <img className="nav__logo-img" src={Logo} alt="Art Zen logo" width="753" height="217" />
                </NavLink>
                <SearchBar />
                {isLoggedIn ? (
                    <SignedInLinks />
                ) : (
                    <SignedOutLinks />
                )}
            </nav>
        </header>
    );
}

export default Header;

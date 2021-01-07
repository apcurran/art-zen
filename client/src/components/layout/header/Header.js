import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import "./Header.css";
import Logo from "../../../assets/images/logo-finished-opt.svg";
import SearchBar from "./SearchBar";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.authToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <header className="header">
            <nav className="nav">
                <NavLink to="/" className="nav__logo-link">
                    <img className="nav__logo-img" src={Logo} alt="Art Zen logo"/>
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

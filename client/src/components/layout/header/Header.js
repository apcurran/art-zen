import "./Header.css";
import Logo from "../../../assets/images/logo-finished-opt.svg";

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <img className="logo" src={Logo} alt="Art Zen logo"/>
            </nav>
        </header>
    );
}

export default Header;

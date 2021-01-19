import { NavLink } from "react-router-dom";

import "./DashboardNav.css";

function DashboardNav() {
    return (
        <nav className="dashboard-nav">
            <ul className="dashboard-nav__list">
                <li className="dashboard-nav__item">
                    <NavLink to="/dashboard/user-info" className="dashboard-nav__link">Edit User Info</NavLink>
                </li>
                <li className="dashboard-nav__item">
                    <NavLink to="/dashboard/my-artwork" className="dashboard-nav-link">My Artwork</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default DashboardNav;

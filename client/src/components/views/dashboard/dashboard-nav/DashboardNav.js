import { NavLink } from "react-router-dom";

import "./DashboardNav.css";

function DashboardNav({ userId }) {
    return (
        <nav className="dashboard-nav">
            <ul className="dashboard-nav__list">
                <li className="dashboard-nav__item">
                    <NavLink to="/dashboard/user-info" className="dashboard-nav__link">Edit User Info</NavLink>
                </li>
                <li className="dashboard-nav__item">
                    <NavLink to={`/dashboard/artworks/users/${userId}`} className="dashboard-nav__link">My Artworks</NavLink>
                </li>
                <li className="dashboard-nav__item">
                    <NavLink to="/dashboard/add-artwork" className="dashboard-nav__link">Add New Artwork</NavLink>
                </li>
                <li className="dashboard-nav__item">
                    <NavLink to="/dashboard/favorites" className="dashboard-nav__link">Favorites</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default DashboardNav;

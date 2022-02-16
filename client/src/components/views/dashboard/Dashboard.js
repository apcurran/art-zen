import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./Dashboard.css";
import { AuthContext } from "../../../contexts/AuthContext";
import DashboardNav from "./dashboard-nav/DashboardNav";
import Subscriptions from "./subscriptions/Subscriptions";
import UserInfo from "./user-info/UserInfo";
import UserProfile from "../../../components/views/user-profile/UserProfile";
import AddArtwork from "./add-artwork/AddArtwork";
import ArtworkFavorites from "./artwork-favorites/ArtworkFavorites";

function Dashboard() {
    const { userId } = useContext(AuthContext);
    const isLoggedIn = localStorage.getItem("authToken");
    const token = isLoggedIn;

    // Route guard
    if (!isLoggedIn) return <Navigate to="/auth/log-in" />;

    return (
        <main className="dashboard-main">
            <h1 className="dashboard-main__title">Dashboard</h1>
            <DashboardNav userId={userId} />
            <Routes>
                {/* Pass props to route components */}
                <Route path="/dashboard/subscriptions" element={<Subscriptions userId={userId} token={token} />} />
                <Route path="/dashboard/user-info" element={<UserInfo userId={userId} token={token} />} />
                <Route path="/dashboard/artworks/users/:id" element={<UserProfile contextUserId={userId} />} />
                <Route path="/dashboard/add-artwork" element={<AddArtwork token={token} />} />
                <Route path="/dashboard/favorites" element={<ArtworkFavorites userId={userId} token={token} />} />
            </Routes>
        </main>
    );
}

export default Dashboard;

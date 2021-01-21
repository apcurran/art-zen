import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./Dashboard.css";
import { AuthContext } from "../../../contexts/AuthContext";
import DashboardNav from "./dashboard-nav/DashboardNav";
import UserInfo from "./user-info/UserInfo";
import UserProfile from "../../../components/views/user-profile/UserProfile";
import ArtworkFavorites from "./artwork-favorites/ArtworkFavorites";

function Dashboard() {
    const { userId } = useContext(AuthContext);
    console.log(userId);
    const isLoggedIn = localStorage.getItem("authToken");

    // Route guard
    if (!isLoggedIn) return <Redirect to="/auth/log-in" />

    return (
        <main className="dashboard-main">
            <h1>Dashboard</h1>
            <DashboardNav userId={userId} />
            <Switch>
                <Route path="/dashboard/user-info" component={UserInfo} />
                {/* Pass props to route component */}
                <Route path="/dashboard/artworks/users/:id" render={() => <UserProfile contextUserId={userId} />} />
            </Switch>
        </main>
    );
}

export default Dashboard;

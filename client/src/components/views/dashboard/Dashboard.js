import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import "./Dashboard.css";
import DashboardNav from "./dashboard-nav/DashboardNav";
import UserInfo from "./user-info/UserInfo";
import MyArtwork from "./my-artwork/MyArtwork";

function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);

    // Route guard
    if (!isLoggedIn) return <Redirect to="/auth/log-in" />

    return (
        <main className="dashboard-main">
            <h1>Dashboard</h1>
            <DashboardNav />
            <Switch>
                <Route path="/dashboard/user-info" component={UserInfo} />
                <Route path="/dashboard/my-artwork" component={MyArtwork} />
            </Switch>
        </main>
    );
}

export default Dashboard;

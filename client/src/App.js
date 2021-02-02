import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import About from "./components/views/about/About";
import Discover from "./components/views/discover/Discover";
import ArtworkView from "./components/views/artwork-view/ArtworkView";
import UserProfile from "./components/views/user-profile/UserProfile";
import Dashboard from "./components/views/dashboard/Dashboard";
import LogIn from "./components/views/auth/log-in/LogIn";
import SignUp from "./components/views/auth/sign-up/SignUp";

function App() {
  const { setIsLoggedIn, setUserId, userId } = useContext(AuthContext);

  useEffect(() => {
    // Run auth check on app startup
    // Set log in status for Auth Context
    localStorage.authToken ? setIsLoggedIn(true) : setIsLoggedIn(false);

    const userId = Number(localStorage.getItem("userId"));

    // Set user id for Auth Context
    userId ? setUserId(userId) : setUserId(0);
  }, [setIsLoggedIn, setUserId]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/artworks/users/:id" render={() => <UserProfile contextUserId={userId} />} />
          <Route path="/artworks/:id" component={ArtworkView} />
          <Route path="/auth/sign-up" component={SignUp} />
          <Route path="/auth/log-in" component={LogIn} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Discover} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

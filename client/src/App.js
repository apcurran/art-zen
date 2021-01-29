import { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Loader from "./components/loader/Loader";

const About = lazy(() => import("./components/views/about/About"));
const Discover = lazy(() => import("./components/views/discover/Discover"));
const ArtworkView = lazy(() => import("./components/views/artwork-view/ArtworkView"));
const UserProfile = lazy(() => import("./components/views/user-profile/UserProfile"));
const Dashboard = lazy(() => import("./components/views/dashboard/Dashboard"));
const LogIn = lazy(() => import("./components/views/log-in/LogIn"));
const SignUp = lazy(() => import("./components/views/sign-up/SignUp"));

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
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/artworks/users/:id" render={() => <UserProfile contextUserId={userId} />} />
            <Route path="/artworks/:id" component={ArtworkView} />
            <Route path="/auth/sign-up" component={SignUp} />
            <Route path="/auth/log-in" component={LogIn} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Discover} />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

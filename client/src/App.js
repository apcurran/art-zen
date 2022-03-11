import { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import GlobalLoader from "./components/loader/GlobalLoader";

import Discover from "./components/views/discover/Discover";
import ArtworkView from "./components/views/artwork-view/ArtworkView";
import About from "./components/views/about/About";
import LogIn from "./components/views/auth/log-in/LogIn";
import SignUp from "./components/views/auth/sign-up/SignUp";
import UserProfile from "./components/views/user-profile/UserProfile";
// lazy-loaded comps
const Dashboard = lazy(() => import("./components/views/dashboard/Dashboard"));
const NotFound = lazy(() => import("./components/views/not-found/NotFound"));

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
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/artworks/users/:id" element={<UserProfile contextUserId={userId} />} />
            <Route path="/artworks/:id" element={<ArtworkView />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/log-in" element={<LogIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/" element={<Discover />} />
            <Route element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

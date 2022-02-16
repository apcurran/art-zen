import { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import GlobalLoader from "./components/loader/GlobalLoader";

const About = lazy(() => import("./components/views/about/About"));
const Discover = lazy(() => import("./components/views/discover/Discover"));
const ArtworkView = lazy(() => import("./components/views/artwork-view/ArtworkView"));
const UserProfile = lazy(() => import("./components/views/user-profile/UserProfile"));
const Dashboard = lazy(() => import("./components/views/dashboard/Dashboard"));
const LogIn = lazy(() => import("./components/views/auth/log-in/LogIn"));
const SignUp = lazy(() => import("./components/views/auth/sign-up/SignUp"));
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

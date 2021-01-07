import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/layout/header/Header";
import About from "./components/views/about/About";
import Discover from "./components/views/discover/Discover";
import ArtworkView from "./components/views/artwork-view/ArtworkView";
import UserProfile from "./components/views/user-profile/UserProfile";
import Footer from "./components/layout/footer/Footer";

function App() {
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Run auth check on app startup
    localStorage.authToken ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/artworks/users/:id" component={UserProfile} />
          <Route path="/artworks/:id" component={ArtworkView} />
          <Route path="/about" component={About} />
          <Route path="/" component={Discover} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

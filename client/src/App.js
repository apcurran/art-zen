import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/layout/header/Header";
import About from "./components/views/about/About";
import Discover from "./components/views/discover/Discover";
import Footer from "./components/layout/footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Discover} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthContextProvider from "./contexts/AuthContext";
import DiscoverArtworksContextProvider from "./contexts/DiscoverArtworksContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DiscoverArtworksContextProvider>
        <App />
      </DiscoverArtworksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

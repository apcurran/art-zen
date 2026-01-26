import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import AuthContextProvider from "./contexts/AuthContext";
import DiscoverArtworksContextProvider from "./contexts/DiscoverArtworksContext";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <DiscoverArtworksContextProvider>
                <App />
            </DiscoverArtworksContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);

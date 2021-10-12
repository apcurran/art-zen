import { useState, createContext, useEffect } from "react";

export const DiscoverArtworksContext = createContext();

function DiscoverArtworksContextProvider(props) {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetch("/api/artworks")
            .then((response) => response.json())
            .then((data) => setArtworks(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <DiscoverArtworksContext.Provider value={{artworks, setArtworks}}>
            {props.children}
        </DiscoverArtworksContext.Provider>
    );
}

export default DiscoverArtworksContextProvider;

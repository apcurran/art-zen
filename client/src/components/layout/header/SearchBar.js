import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function SearchBar() {
    const { setArtworks } = useContext(DiscoverArtworksContext);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    async function handleSearchSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/artworks/search?q=${searchText}`);
            const searchResultsData = await response.json();

            setArtworks(searchResultsData);
            navigate("/");

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSearchSubmit} className="search-form">
            <input value={searchText} onChange={(event) => setSearchText(event.target.value)} type="text" className="search-form__input" aria-label="Search for artworks" placeholder="Search for artworks..."/>
        </form>
    );
}

export default SearchBar;

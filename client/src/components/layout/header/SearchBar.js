import { useContext, useState } from "react";

import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function SearchBar() {
    const { setArtworks } = useContext(DiscoverArtworksContext);
    const [searchText, setSearchText] = useState("");

    async function handleSearchSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/artworks/search?q=${searchText}`);
            const searchResultsData = await response.json();

            setArtworks(searchResultsData);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSearchSubmit} className="search-form">
            <input value={searchText} onChange={(event) => setSearchText(event.target.value)} type="text" className="search-form__input" placeholder="Search for artworks..."/>
        </form>
    );
}

export default SearchBar;

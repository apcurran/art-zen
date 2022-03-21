import { useContext, useState, useEffect } from "react";

import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function SearchBar() {
    const { setArtworks } = useContext(DiscoverArtworksContext);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearchFetch();
        }, 250); // timeout of 275ms

        return () => clearTimeout(timeout);
    }, [searchText]);

    async function handleInputChange(event) {
        const revisedSearchText = event.target.value;
        setSearchText(revisedSearchText);
    }
    
    async function handleSearchFetch() {
        try {
            const response = await fetch(`/api/artworks/search?q=${searchText}`);
            const searchResultsData = await response.json();
    
            setArtworks(searchResultsData);
    
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <form className="search-form">
            <input value={searchText} onChange={handleInputChange} type="text" className="search-form__input" aria-label="Search for artworks" placeholder="Search for artworks by title or genre"/>
        </form>
    );
}

export default SearchBar;

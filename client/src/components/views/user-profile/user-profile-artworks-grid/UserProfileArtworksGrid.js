import "./UserProfileArtworksGrid.css";
import UserProfileArtwork from "../user-profile-artwork/UserProfileArtwork";

function UserProfileArtworksGrid({ artworks }) {
    return (
        <section className="user-profile__artworks-grid">
            {artworks.map(artwork => (
                <UserProfileArtwork artwork={artwork} key={artwork.artwork_id} />
            ))}
        </section>
    );
}

export default UserProfileArtworksGrid;

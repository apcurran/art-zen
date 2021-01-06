import "./UserProfileArtworksGrid.css";
import UserProfileArtwork from "../user-profile-artwork/UserProfileArtwork";

function UserProfileArtworks({ artworks }) {
    return (
        <section className="user-profile__artworks-grid">
            {artworks.map(artwork => (
                <UserProfileArtwork artwork={artwork} />
            ))}
        </section>
    );
}

export default UserProfileArtworks;

import "./UserProfileArtworksGrid.css";
import UserProfileArtwork from "../user-profile-artwork/UserProfileArtwork";

function UserProfileArtworksGrid({ artworks, canUserDeleteArtwork, deleteArtwork }) {
    return (
        <section className="user-profile__artworks-grid">
            {artworks.map(artwork => (
                <UserProfileArtwork artwork={artwork} canUserDeleteArtwork={canUserDeleteArtwork} deleteArtwork={deleteArtwork} artworkId={artwork.artwork_id} key={artwork.artwork_id} />
            ))}
        </section>
    );
}

export default UserProfileArtworksGrid;

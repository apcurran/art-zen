import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./UserProfileArtwork.css";

function UserProfileArtwork({ artwork, canUserDeleteArtwork, deleteArtwork, artworkId }) {
    return (
        <article className="user-profile__artworks-grid__article">
            <Link to={{pathname: `/artworks/${artwork.artwork_id}`}} className="user-profile__artworks-grid__article__link">
                <Image
                    className="user-profile__artworks-grid__article__link__img"
                    cloudName="dev-project"
                    publicId={artwork.artwork_img_url}
                    alt={artwork.img_alt_txt}
                    width={artwork.img_width}
                    height={artwork.img_height}
                    decoding="async"
                >
                    <Transformation quality="auto" fetchFormat="auto" height="375" width="auto" crop="scale" />
                </Image>
            </Link>
            {canUserDeleteArtwork ? (
                <button onClick={() => deleteArtwork(artworkId)} className="user-profile__artworks-grid__article__delete-btn cta-btn">Delete</button>
            ) : null}
        </article>
    );
}

export default UserProfileArtwork;

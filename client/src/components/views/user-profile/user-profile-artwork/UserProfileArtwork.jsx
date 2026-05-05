import { Link } from "react-router";
import { AdvancedImage } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";

import { cld } from "../../../../utils/cloudinary-client";

import "./UserProfileArtwork.css";

function UserProfileArtwork({
    artwork,
    canUserDeleteArtwork,
    deleteArtwork,
    artworkId,
}) {
    const img = cld
        .image(artwork.artwork_img_url)
        .resize(scale())
        .quality("auto")
        .format("auto");

    return (
        <article className="user-profile__artworks-grid__article">
            <Link
                to={{ pathname: `/artworks/${artwork.artwork_id}` }}
                className="user-profile__artworks-grid__article__link"
            >
                <AdvancedImage
                    cldImg={img}
                    alt={artwork.img_alt_txt}
                    width={artwork.img_width}
                    height={artwork.img_height}
                    decoding="async"
                    className="user-profile__artworks-grid__article__link__img"
                />
            </Link>
            {canUserDeleteArtwork ? (
                <button
                    onClick={() => deleteArtwork(artworkId)}
                    className="user-profile__artworks-grid__article__delete-btn cta-btn"
                >
                    Delete
                </button>
            ) : null}
        </article>
    );
}

export default UserProfileArtwork;

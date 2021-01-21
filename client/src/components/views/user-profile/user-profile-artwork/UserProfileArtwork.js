import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./UserProfileArtwork.css";

function UserProfileArtwork({ artwork, canUserDeleteArtwork, artworkId }) {
    return (
        <div className="">
            <Link to={{pathname: `/artworks/${artwork.artwork_id}`}} className="">
                <Image
                    className=""
                    cloudName="dev-project"
                    publicId={artwork.artwork_img_url}
                >
                    <Transformation quality="auto" fetchFormat="auto" height="375" width="auto" crop="scale" />
                </Image>
            </Link>
            {canUserDeleteArtwork ? (
                <button>Delete</button>
            ) : null}
        </div>
    );
}

export default UserProfileArtwork;

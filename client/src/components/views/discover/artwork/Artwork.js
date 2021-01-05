import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./Artwork.css";

function Artwork({ img_url, artwork_id }) {
    return (
        <Link to={{pathname: `/artworks/${artwork_id}`}} className="masonry-grid__link">
            <Image
                className="masonry-grid__link__img"
                cloudName="dev-project"
                publicId={img_url}
            >
                <Transformation quality="auto" fetchFormat="auto" height="375" width="auto" crop="scale" />
            </Image>
        </Link>
    );
}

export default Artwork;

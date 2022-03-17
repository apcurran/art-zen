import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./GridArtwork.css";

function GridArtwork({ img_url, img_alt_txt, artwork_id, title, username }) {
    return (
        <Link to={{pathname: `/artworks/${artwork_id}`}} className="masonry-grid__link">
            <figure className="masonry-grid__link__fig">
                <Image
                    className="masonry-grid__link__img"
                    cloudName="dev-project"
                    publicId={img_url}
                    alt={`${title} by ${username} -- ${img_alt_txt}`}
                    decoding="async"
                >
                    <Transformation quality="auto" fetchFormat="auto" height="375" width="auto" crop="scale" />
                </Image>
                <figcaption className="masonry-grid__link__fig-caption">Test caption here</figcaption>
            </figure>
        </Link>
    );
}

export default GridArtwork;

import { Image, Transformation } from "cloudinary-react";

import "./Artwork.css";

function Artwork({ img_url }) {
    return (
        <Image
            className="masonry-grid__img"
            cloudName="dev-project"
            publicId={img_url}
            height="300"
            width="auto"
            loading="lazy"
        >
            <Transformation quality="auto" fetchFormat="auto" />
        </Image>
    );
}

export default Artwork;

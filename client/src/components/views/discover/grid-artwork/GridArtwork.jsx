import { Link } from "react-router";
import { AdvancedImage } from "@cloudinary/react";

import { cld } from "../../../../utils/cloudinary-client";

import "./GridArtwork.css";
import { scale } from "@cloudinary/url-gen/actions/resize";

function GridArtwork({ img_url, img_alt_txt, artwork_id, title, username }) {
    const img = cld
        .image(img_url)
        .resize(scale())
        .quality("auto")
        .format("auto");

    return (
        <Link
            to={{ pathname: `/artworks/${artwork_id}` }}
            className="masonry-grid__link"
        >
            <figure className="masonry-grid__link__fig">
                <AdvancedImage
                    cldImg={img}
                    height="375"
                    width="auto"
                    alt={`${title} by ${username} -- ${img_alt_txt}`}
                    className="masonry-grid__link__img"
                    decoding="async"
                />
                <figcaption className="masonry-grid__link__fig-caption">
                    <h2 className="masonry-grid__link__fig-caption__title">
                        {title}
                    </h2>
                    <p className="masonry-grid__link__fig-caption__username">
                        by {username}
                    </p>
                </figcaption>
            </figure>
        </Link>
    );
}

export default GridArtwork;

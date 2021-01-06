
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./ArtworkInfo.css";
import formatDate from "../../../../utils/format-date";

function ArtworkInfo({ artworkData }) {
    return (
        <section className="artwork-view__info">
            <figure className="artwork-view__info__fig">
                <Image
                    className="artwork-view__info__fig__img"
                    cloudName="dev-project"
                    publicId={artworkData.img_url}
                    height="525"
                >
                    <Transformation quality="auto" fetchFormat="auto" />
                </Image>
            </figure>
            <h1 className="artwork-view__info__title">{artworkData.title}</h1>
            <span className="artwork-view__info__by">by</span>
            <Link to={{pathname: `/artworks/users/${artworkData.user_id}`}} className="artwork-view__info__author">{artworkData.username}</Link>
            <p className="artwork-view__info__desc">{artworkData.description}</p>
            {artworkData.artwork_created_at ? (
                <p className="artwork-view__info__date">Published on {formatDate(artworkData.artwork_created_at)}</p>
            ) : null}
        </section>
    );
}

export default ArtworkInfo;
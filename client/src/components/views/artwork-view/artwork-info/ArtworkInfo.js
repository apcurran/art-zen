
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { format, parseISO } from "date-fns";

import "./ArtworkInfo.css";

function ArtworkInfo({ artworkData }) {
    function formatDate(date) {
        return format(parseISO(date), "MMM do, yyyy");
    }

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
            <p className="artwork-view__info__author">by {artworkData.username}</p>
            <p className="artwork-view__info__desc">{artworkData.description}</p>
            {artworkData.artwork_created_at ? (
                <p className="artwork-view__info__date">Published on {formatDate(artworkData.artwork_created_at)}</p>
            ) : null}
        </section>
    );
}

export default ArtworkInfo;
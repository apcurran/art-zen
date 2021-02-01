import { Image, Transformation } from "cloudinary-react";
import { Link } from "react-router-dom"

import "./SubscriptionCard.css";
import formatDate from "../../../../utils/format-date";

function SubscriptionCard({ artwork }) {
    return (
        <article className="subscriptions-grid__card">
            <Link to={{pathname: `/artworks/${artwork.artwork_id}`}}>
                <figure className="subscriptions-grid__card__fig">
                    <Image
                        className="subscriptions-grid__card__fig__img"
                        cloudName="dev-project"
                        publicId={artwork.img_url}
                        height="450"
                    >
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
            </Link>
            <h3 className="subscriptions-grid__card__title">{artwork.title}</h3>
            <span className="subscriptions-grid__card__genre-chip">{artwork.genre}</span>
            <p className="subscriptions-grid__card__user-desc">Posted by {artwork.username} on {formatDate(artwork.created_at)}</p>
        </article>
    );
}

export default SubscriptionCard;

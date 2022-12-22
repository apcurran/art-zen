import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./SubscriptionCard.css";

import Chip from "../../../chip/Chip";
import formatDate from "../../../../utils/format-date";

function SubscriptionCard({ artwork }) {
    return (
        <article className="subscriptions-grid__card">
            <Link to={{ pathname: `/artworks/${artwork.artwork_id}` }} className="subscriptions-grid__card-link-container">
                <figure className="subscriptions-grid__card__fig">
                    <Image
                        className="subscriptions-grid__card__fig__img"
                        cloudName="dev-project"
                        publicId={artwork.img_url}
                        alt={artwork.img_alt_txt}
                        height="450"
                        width="auto"
                        decoding="async"
                    >
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
                <h3 className="subscriptions-grid__card__title">{artwork.title}</h3>
                <Chip passedClass="subscriptions-grid__card__genre-chip">{artwork.genre}</Chip>
            </Link>
            <p className="subscriptions-grid__card__user-desc">
                Posted by <Link to={{ pathname: `/artworks/users/${artwork.user_id}` }} className="subscriptions-grid__card__user-desc__user-link">{artwork.username}</Link> on <time>{formatDate(artwork.created_at)}</time>
            </p>
        </article>
    );
}

export default SubscriptionCard;

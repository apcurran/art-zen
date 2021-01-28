import { Image, Transformation } from "cloudinary-react";

import "./SubscriptionCard.css";
import formatDate from "../../../../utils/format-date";

function SubscriptionCard({ artwork }) {
    return (
        <article className="subscriptions-grid__card">
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
            <h3>{artwork.title}</h3>
            <p>Posted by {artwork.username} on {formatDate(artwork.created_at)}</p>
            <span>{artwork.genre}</span>
        </article>
    );
}

export default SubscriptionCard;

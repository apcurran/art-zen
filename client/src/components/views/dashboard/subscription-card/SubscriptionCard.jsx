import { Link } from "react-router";
import { AdvancedImage } from "@cloudinary/react";

import { cld } from "../../../../utils/cloudinary-client";

import "./SubscriptionCard.css";

import Chip from "../../../chip/Chip";
import formatDate from "../../../../utils/format-date";

function SubscriptionCard({ artwork }) {
    const img = cld.image(artwork.img_url).quality("auto").format("auto");

    return (
        <article className="subscriptions-grid__card">
            <Link
                to={{ pathname: `/artworks/${artwork.artwork_id}` }}
                className="subscriptions-grid__card-link-container"
            >
                <figure className="subscriptions-grid__card__fig">
                    <AdvancedImage
                        cldImg={img}
                        alt={artwork.img_alt_txt}
                        className="subscriptions-grid__card__fig__img"
                        height="450"
                        width="auto"
                        decoding="async"
                    />
                </figure>
                <h3 className="subscriptions-grid__card__title">
                    {artwork.title}
                </h3>
                <Chip passedClass="subscriptions-grid__card__genre-chip">
                    {artwork.genre}
                </Chip>
            </Link>
            <p className="subscriptions-grid__card__user-desc">
                Posted by{" "}
                <Link
                    to={{ pathname: `/artworks/users/${artwork.user_id}` }}
                    className="subscriptions-grid__card__user-desc__user-link"
                >
                    {artwork.username}
                </Link>{" "}
                on <time>{formatDate(artwork.created_at)}</time>
            </p>
        </article>
    );
}

export default SubscriptionCard;

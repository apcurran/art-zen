import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./ArtworkInfo.css";
import Chip from "../../../chip/Chip";
import formatDate from "../../../../utils/format-date";

function ArtworkInfo({ artworkData, likes, updateLikes, currUserHasLiked, favorites, updateFavorites, currUserHasFavorited }) {
    return (
        <section className="artwork-view__info">
            <figure className="artwork-view__info__fig">
                <Image
                    className="artwork-view__info__fig__img"
                    cloudName="dev-project"
                    publicId={artworkData.imgUrl}
                    height="525"
                    decoding="async"
                >
                    <Transformation quality="auto" fetchFormat="auto" />
                </Image>
            </figure>
            <h1 className="artwork-view__info__title">{artworkData.title}</h1>
            <span className="artwork-view__info__by">by</span>
            <Link to={{pathname: `/artworks/users/${artworkData.userId}`}} className="artwork-view__info__author">{artworkData.username}</Link>
            <div>
                <Chip>{artworkData.genre}</Chip>
            </div>
            <div className="artwork-view__info__social-data">
                <div onClick={updateLikes} className="artwork-view__info__social-data__container">
                    <svg className={currUserHasLiked ? "like-heart-icon--full like-heart-icon" : "like-heart-icon"} fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <span className="artwork-view__info__social-data__totals">{likes.length} Likes</span>
                </div>
                <div onClick={updateFavorites} className="artwork-view__info__social-data__container">
                    <svg className={currUserHasFavorited ? "favorite-star-icon--full favorite-star-icon" : "favorite-star-icon"} fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    <span className="artwork-view__info__social-data__totals">{favorites.length} Favorites</span>
                </div>
            </div>
            <p className="artwork-view__info__desc">{artworkData.description}</p>
            {artworkData.artworkCreatedAt ? (
                <p className="artwork-view__info__date">Published on {formatDate(artworkData.artworkCreatedAt)}</p>
            ) : null}
        </section>
    );
}

export default ArtworkInfo;
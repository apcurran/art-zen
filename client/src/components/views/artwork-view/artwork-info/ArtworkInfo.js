import "./ArtworkInfo.css";

import { Image, Transformation } from "cloudinary-react";

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
        </section>
    );
}

export default ArtworkInfo;
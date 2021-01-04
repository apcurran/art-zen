import { Image } from "cloudinary-react";

function Artwork({ img_url }) {
    return (
        <Image cloudName="dev-project" publicId={img_url} width="300" crop="scale" />
    );
}

export default Artwork;

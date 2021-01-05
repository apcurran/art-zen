import { useParams } from "react-router";

function ArtworkView() {
    const { id } = useParams();

    return (
        <div>
            Artwork View {id}
        </div>
    );
}

export default ArtworkView;

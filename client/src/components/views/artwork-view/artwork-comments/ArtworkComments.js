import "./ArtworkComments.css";

function ArtworkComments({ comments }) {
    return (
        <div>
            <section className="artwork-view__comments-total">
                <span className="artwork-view__comments-total__title">Comments</span>
                <span className="dot">&bull;</span>
                <span className="artwork-view__comments-total__amt">{comments.length}</span>
            </section>
        </div>
    );
}

export default ArtworkComments;

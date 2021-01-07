import "./ArtworkComments.css";
import UserAvatarDefault from "./user-avatar-default/UserAvatarDefault";
import UserComment from "./user-comment/UserComment";

function ArtworkComments({ comments }) {
    return (
        <div className="artwork-view__comments-section">
            <section className="artwork-view__comments-total">
                <span className="artwork-view__comments-total__title">Comments</span>
                <span className="dot">&bull;</span>
                <span className="artwork-view__comments-total__amt">{comments.length}</span>
            </section>
            <section className="artwork-view__comments">
                <div className="artwork-view__comments__user__logged-out">
                    <UserAvatarDefault />
                    <p className="artwork-view__comments__user__logged-out__desc">
                        Join the Art Zen community to post your comment. If you are already a member, <span>Log In</span>.
                    </p>
                </div>
                {comments.map(comment => (
                    <UserComment comment={comment} key={comment.comment_id} />
                ))}
            </section>
        </div>
    );
}

export default ArtworkComments;

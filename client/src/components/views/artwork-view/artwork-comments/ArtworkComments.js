import { Link } from "react-router-dom";

import "./ArtworkComments.css";
import UserAvatarDefault from "./user-avatar-default/UserAvatarDefault";
import UserComment from "./user-comment/UserComment";
import UserCommentForm from "./user-comment-form/UserCommentForm";

function ArtworkComments({ comments, isLoggedIn, userId, commentText, setCommentText, handleCommentSubmit, handleRemoveComment }) {
    return (
        <div className="artwork-view__comments-section">
            <section className="artwork-view__comments-total">
                <span className="artwork-view__comments-total__title">Comments</span>
                <span className="dot">&bull;</span>
                <span className="artwork-view__comments-total__amt">{comments.length}</span>
            </section>
            <section className="artwork-view__comments">
                {isLoggedIn ? (
                    <UserCommentForm commentText={commentText} setCommentText={setCommentText} handleCommentSubmit={handleCommentSubmit} />
                ) : (
                    <div className="artwork-view__comments__user__logged-out">
                        <UserAvatarDefault />
                        <p className="artwork-view__comments__user__logged-out__desc">
                            Join the Art Zen community to post your comment. If you are already a member, <Link to="/auth/log-in" className="artwork-view__comments__user__logged-out__desc__link" >Log In</Link>.
                        </p>
                    </div>
                )}
                {comments.map(comment => (
                    <UserComment userId={userId} comment={comment} key={comment.comment_id} handleRemoveComment={handleRemoveComment} commentId={comment.comment_id} />
                ))}
            </section>
        </div>
    );
}

export default ArtworkComments;

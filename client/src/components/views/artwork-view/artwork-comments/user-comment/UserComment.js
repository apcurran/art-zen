import "./UserComment.css";
import UserAvatar from "../user-avatar/UserAvatar";

function UserComment({ comment }) {
    return (
        <div className="comment-segment">
            <UserAvatar avatarImg={comment.comment_avatar_img} />
            <div className="comment-segment__info">
                <h4 className="comment-segment__info__username">Username</h4>
                <span className="comment-segment__info__date">Date</span>
                <p className="comment-segment__info__desc">Description of comment...</p>
            </div>
        </div>
    );
}

export default UserComment;

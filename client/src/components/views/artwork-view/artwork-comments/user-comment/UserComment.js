import "./UserComment.css";
import UserAvatarDefault from "../user-avatar-default/UserAvatarDefault";
import UserAvatar from "../user-avatar/UserAvatar";
import formatDate from "../../../../../utils/format-date";

function UserComment({ comment }) {
    return (
        <div className="comment-segment">
            {comment.comment_avatar_img ? (
                <UserAvatar avatarImg={comment.comment_avatar_img} />
            ) : (
                <UserAvatarDefault />
            )}
            {/* <UserAvatar avatarImg={comment.comment_avatar_img} /> */}
            <div className="comment-segment__info">
                <h4 className="comment-segment__info__username">{comment.comment_username}</h4>
                <span className="comment-segment__info__date">{formatDate(comment.comment_created_at)}</span>
                <p className="comment-segment__info__desc">{comment.text}</p>
            </div>
        </div>
    );
}

export default UserComment;

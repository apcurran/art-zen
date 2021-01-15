import "./UserComment.css";
import UserAvatarDefault from "../user-avatar-default/UserAvatarDefault";
import UserAvatar from "../user-avatar/UserAvatar";
import formatDate from "../../../../../utils/format-date";

function UserComment({ userId, comment }) {
    return (
        <div className="comment-segment">
            {comment.comment_avatar_img ? (
                <UserAvatar avatarImg={comment.comment_avatar_img} />
            ) : (
                <UserAvatarDefault />
            )}
            <div className="comment-segment__info">
                <h4 className="comment-segment__info__username">{comment.comment_username}</h4>
                <span className="comment-segment__info__date">{formatDate(comment.comment_created_at)}</span>
                <p className="comment-segment__info__desc">{comment.text}</p>
                <span>{userId} type is {typeof userId}</span>
                <span>{comment.user_id} type is {typeof comment.user_id}</span>
                {comment.user_id === userId ? (
                    <button>Delete Comment</button>
                ) : null}
            </div>
        </div>
    );
}

export default UserComment;

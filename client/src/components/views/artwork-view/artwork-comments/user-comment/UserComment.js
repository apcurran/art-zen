import "./UserComment.css";
import UserAvatarDefault from "../user-avatar-default/UserAvatarDefault";
import UserAvatar from "../user-avatar/UserAvatar";
import formatDate from "../../../../../utils/format-date";

function UserComment({ userId, comment, handleRemoveComment, commentId }) {
    return (
        <article className="comment-segment">
            {comment.comment_avatar_img ? (
                <UserAvatar avatarImg={comment.comment_avatar_img} />
            ) : (
                <UserAvatarDefault />
            )}
            <div className="comment-segment__info">
                <h4 className="comment-segment__info__username">{comment.comment_username}</h4>
                <time className="comment-segment__info__date">{formatDate(comment.comment_created_at)}</time>
                <p className="comment-segment__info__desc">{comment.text}</p>
                {comment.user_id === userId ? (
                    <button onClick={() => handleRemoveComment(commentId)} className="comment-segment__info__delete-btn">
                        <svg className="trash-icon" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        <span className="comment-segment__info__delete-btn__span">Delete</span>
                    </button>
                ) : null}
            </div>
        </article>
    );
}

export default UserComment;

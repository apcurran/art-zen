import "./UserAvatar.css";

function UserAvatar({ avatarImg }) {
    return (
        <figure className="user-avatar">
            <img
                src={avatarImg}
                alt="User avatar"
                className="user-avatar__img"
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
            />
        </figure>
    );
}

export default UserAvatar;

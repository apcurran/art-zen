import "./UserProfileInfo.css";

function UserProfileInfo({ profileData, totalCreations, totalFollowers }) {
    return (
        <section className="user-profile__info">
            <figure className="user-profile__info__avatar">
                <img src={profileData.avatarImg} alt="User avatar" className="user-profile__info__avatar__img"/>
            </figure>
            <div className="user-profile__info-sect">
                <div className="user-profile__info-sect__inner-container">
                    <div className="user-profile__info-sect--left">
                        <h2 className="user-profile__info-sect__username">{profileData.username}</h2>
                        <p className="user-profile__info-sect__totals">
                            <span>{totalCreations}</span> Creation(s) <span>{totalFollowers}</span> Follower(s)
                        </p>
                    </div>
                    <div className="user-profile__info-sect--right">
                        <button className="user-profile__info__follow-btn">Follow</button>
                    </div>
                </div>
                <p className="user-profile__info__bio">{profileData.bioDesc}</p>
            </div>
        </section>
    );
}

export default UserProfileInfo;

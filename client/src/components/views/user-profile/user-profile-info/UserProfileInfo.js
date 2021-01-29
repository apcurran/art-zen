import "./UserProfileInfo.css";

function UserProfileInfo({ profileData, totalCreations, totalFollowers, canUserDeleteArtwork, handleUpdateFollowers, isFollowing }) {
    return (
        <section className="user-profile__info">
            {profileData.avatarImg ? (
                <figure className="user-profile__info__avatar">
                    <img src={profileData.avatarImg} alt="User avatar" className="user-profile__info__avatar__img"/>
                </figure>
            ) : (
                <figure className="user-profile__info__avatar  user-profile__info__avatar--default">
                    <svg className="user-profile__info__avatar__icon--default" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </figure>
            )}
            <div className="user-profile__info-sect">
                <div className="user-profile__info-sect__inner-container">
                    <div className="user-profile__info-sect--left">
                        <h2 className="user-profile__info-sect__username">{profileData.username}</h2>
                        <p className="user-profile__info-sect__totals">
                            <span>{totalCreations}</span> Creation(s) <span>{totalFollowers}</span> Follower(s)
                        </p>
                    </div>
                    <div className="user-profile__info-sect--right">
                        {canUserDeleteArtwork ? null : (
                            <button onClick={handleUpdateFollowers} className={isFollowing ? "user-profile__info__follow-btn--activated user-profile__info__follow-btn cta-btn" : "user-profile__info__follow-btn cta-btn"}>Follow</button>
                        )}
                    </div>
                </div>
                <p className="user-profile__info__bio">{profileData.bioDesc}</p>
            </div>
        </section>
    );
}

export default UserProfileInfo;

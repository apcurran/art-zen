import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./UserProfile.css";

import UserProfileInfo from "./user-profile-info/UserProfileInfo";
import UserProfileArtworksGrid from "./user-profile-artworks-grid/UserProfileArtworksGrid";

function UserProfile({ contextUserId }) {
    const { id } = useParams();
    const canUserDeleteArtwork = contextUserId === Number(id) ? true : false;

    const [profileData, setProfileData] = useState({
        username: "",
        avatarImg: "",
        bioDesc: ""
    });
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetch(`/api/artworks/users/${id}`)
            .then(response => response.json())
            .then(data => {
                setProfileData({
                    username: data.userData.username,
                    avatarImg: data.userData.avatar_img_url,
                    bioDesc: data.userData.bio_description
                });
                setTotalFollowers(data.userData.total_followers);
                setArtworks(data.artworkData);
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <main className="user-profile-main">
            <UserProfileInfo profileData={profileData} totalCreations={artworks.length} totalFollowers={totalFollowers} />
            <UserProfileArtworksGrid artworks={artworks} canUserDeleteArtwork={canUserDeleteArtwork} />
        </main>
    );
}

export default UserProfile;

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useRouteMatch } from "react-router-dom";

import "./UserProfile.css";

import UserProfileInfo from "./user-profile-info/UserProfileInfo";
import UserProfileArtworksGrid from "./user-profile-artworks-grid/UserProfileArtworksGrid";
import { AuthContext } from "../../../contexts/AuthContext";
import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function UserProfile({ contextUserId }) {
    const { isLoggedIn, userId } = useContext(AuthContext);
    const { artworks, setArtworks } = useContext(DiscoverArtworksContext);
    const navigate = useNavigate();
    const match = useRouteMatch("/artworks/users/:id");

    const { id } = useParams();
    const canUserDeleteArtwork = contextUserId === Number(id) ? true : false;

    const [profileData, setProfileData] = useState({
        username: "",
        avatarImg: "",
        bioDesc: ""
    });
    const [followers, setFollowers] = useState([]);
    const [userArtworks, setUserArtworks] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetch(`/api/artworks/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    username: data.userData.username,
                    avatarImg: data.userData.avatar_img_url,
                    bioDesc: data.userData.bio_description
                });
                setFollowers(data.followerData);
                setUserArtworks(data.artworkData);
            })
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        const hasUserFollowed = followers.some((followerObj) => followerObj.follower_user_id === userId);

        setIsFollowing(hasUserFollowed);
    }, [userId, followers]);

    async function deleteArtwork(artworkId) {
        const token = localStorage.getItem("authToken");

        try {
            // Delete from db
            await fetch(`/api/artworks/${artworkId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Remove from local component DOM
            const updatedArtworks = userArtworks.filter((artwork) => artwork.artwork_id !== artworkId);

            setUserArtworks(updatedArtworks);

            // Update global context state
            const updatedContextArtworks = artworks.filter((artwork) => artwork.artwork_id !== artworkId);

            setArtworks(updatedContextArtworks);

        } catch (err) {
            console.error(err);
        }
    }

    // Follow functionality
    async function handleUpdateFollowers() {
        // Check if logged in user first
        if (!isLoggedIn) {
            return navigate("/auth/log-in");
        }

        const token = localStorage.getItem("authToken");
        const artistId = id;

        if (!isFollowing) {
            addFollower(artistId, token);
        } else {
            removeFollower(artistId, userId, token);
        }

    }
    
    async function addFollower(artistId, token) {
        try {
            const response = await fetch(`/api/users/${artistId}/followers`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { addedFollower } = await response.json();

            setFollowers([...followers, addedFollower]);
    
        } catch (err) {
            console.error(err);
        }
    }

    async function removeFollower(artistId, userId, token) {
        try {
            // Remove from db
            await fetch(`/api/users/${artistId}/followers/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Remove from local state
            const updatedFollowers = followers.filter((follower) => follower.follower_user_id !== userId);

            setFollowers(updatedFollowers);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main className={match ? "user-profile-main" : "user-profile-main--dashboard"}>
            <UserProfileInfo
                profileData={profileData}
                totalCreations={userArtworks.length}
                totalFollowers={followers.length}
                canUserDeleteArtwork={canUserDeleteArtwork}
                handleUpdateFollowers={handleUpdateFollowers}
                isFollowing={isFollowing}
            />
            <UserProfileArtworksGrid
                artworks={userArtworks}
                canUserDeleteArtwork={canUserDeleteArtwork}
                deleteArtwork={deleteArtwork}
            />
        </main>
    );
}

export default UserProfile;

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import "./UserProfile.css";

import UserProfileInfo from "./user-profile-info/UserProfileInfo";
import UserProfileArtworksGrid from "./user-profile-artworks-grid/UserProfileArtworksGrid";
import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function UserProfile({ contextUserId }) {
    const { artworks, setArtworks } = useContext(DiscoverArtworksContext);

    const { id } = useParams();
    const canUserDeleteArtwork = contextUserId === Number(id) ? true : false;

    const [profileData, setProfileData] = useState({
        username: "",
        avatarImg: "",
        bioDesc: ""
    });
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [userArtworks, setUserArtworks] = useState([]);

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
                setUserArtworks(data.artworkData);
            })
            .catch(err => console.error(err));
    }, [id]);

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
            const updatedArtworks = userArtworks.filter(artwork => artwork.artwork_id !== artworkId);

            setUserArtworks(updatedArtworks);

            // Update global context state
            const updatedContextArtworks = artworks.filter(artwork => artwork.artwork_id !== artworkId);

            setArtworks(updatedContextArtworks);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main className={canUserDeleteArtwork ? "user-profile-main--dashboard" : "user-profile-main"}>
            <UserProfileInfo profileData={profileData} totalCreations={userArtworks.length} totalFollowers={totalFollowers} canUserDeleteArtwork={canUserDeleteArtwork} />
            <UserProfileArtworksGrid artworks={userArtworks} canUserDeleteArtwork={canUserDeleteArtwork} deleteArtwork={deleteArtwork} />
        </main>
    );
}

export default UserProfile;

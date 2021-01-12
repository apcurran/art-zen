import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";

import "./ArtworkView.css";
import { AuthContext } from "../../../contexts/AuthContext";
import checkUserIdInArr from "../../../utils/check-user-id-in-arr";
import ArtworkInfo from "./artwork-info/ArtworkInfo";
import ArtworkComments from "./artwork-comments/ArtworkComments";

function ArtworkView() {
    const { id } = useParams();
    const { isLoggedIn } = useContext(AuthContext);
    const history = useHistory();
    // State
    const [artworkData, setArtworkData] = useState({
        artwork_id: 0,
        user_id: 0,
        title: "",
        description: "",
        img_url: "",
        artwork_created_at: "",
        username: "",
        avatar_img_url: ""
    });
    const [likes, setLikes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/artworks/${id}`)
            .then(response => response.json())
            .then(data => {
                setArtworkData({
                    artwork_id: data.artwork_id,
                    user_id: data.user_id,
                    title: data.title,
                    description: data.description,
                    img_url: data.img_url,
                    artwork_created_at: data.artwork_created_at,
                    username: data.username,
                    avatar_img_url: data.avatar_img_url
                });
                setLikes(data.likes);
                setFavorites(data.favorites);
                setComments(data.comments);
            })
            .catch(err => console.error(err));
    }, [id]);

    // ArtworkInfo comp behaviors
    async function updateLikes() {
        // Checked logged in first
        if (!isLoggedIn) {
            return history.push("/auth/log-in");
        }

        const token = localStorage.getItem("authToken");
        // Convert str to num type before using
        const userId = Number(localStorage.getItem("userId"));

        const hasUserLikedArtwork = checkUserIdInArr(userId, likes);

        if (!hasUserLikedArtwork) {
            addLike(id, token);
        } else {
            debugger;
            
            const likeId = getLikeId(userId, likes);
            removeLike(id, likeId, token);
        }
    }

    async function addLike(artworkId, authToken) {
        try {
            const response = await fetch(`/api/artworks/${artworkId}/likes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            });

            const { likesData } = await response.json();
            // Update state
            setLikes([...likes, likesData]);
            
        } catch (err) {
            console.error(err);
        }
    }

    async function removeLike(artworkId, likeId, authToken) {
        try {
            const response = await fetch(`/api/artworks/${artworkId}/likes/${likeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            });

            await response.json();
            // Update state
            

        } catch (err) {
            console.error(err);
        }
    }

    function getLikeId(userId, likesArr) {
        const liked = likesArr.filter(obj => obj.user_id === userId);

        return liked[0].like_id;
    }

    // ArtworkComments comp behaviors

    return (
        <main className="artwork-view">
            <ArtworkInfo artworkData={artworkData} likes={likes} updateLikes={updateLikes} favorites={favorites} />
            <ArtworkComments comments={comments} />
        </main>
    );
}

export default ArtworkView;

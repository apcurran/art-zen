import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";

import "./ArtworkView.css";
import { AuthContext } from "../../../contexts/AuthContext";
import checkUserIdInArr from "../../../utils/check-user-id-in-arr";
import ArtworkInfo from "./artwork-info/ArtworkInfo";
import ArtworkComments from "./artwork-comments/ArtworkComments";

function ArtworkView() {
    const { id } = useParams();
    const { isLoggedIn, userId } = useContext(AuthContext);
    const history = useHistory();
    // State
    const [artworkData, setArtworkData] = useState({
        artworkId: 0,
        userId: 0,
        title: "",
        description: "",
        imgUrl: "",
        artworkCreatedAt: "",
        username: "",
        avatarImgUrl: ""
    });
    const [likes, setLikes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    // User Comments state
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        fetch(`/api/artworks/${id}`)
            .then(response => response.json())
            .then(data => {
                setArtworkData({
                    artworkId: data.artwork_id,
                    userId: data.user_id,
                    title: data.title,
                    description: data.description,
                    imgUrl: data.img_url,
                    artworkCreatedAt: data.artwork_created_at,
                    username: data.username,
                    avatarImgUrl: data.avatar_img_url
                });
                setLikes(data.likes);
                setFavorites(data.favorites);
                setComments(data.comments);
            })
            .catch(err => console.error(err));
    }, [id]);

    // ArtworkInfo comp behaviors //
    async function updateLikes() {
        // Checked logged in first
        if (!isLoggedIn) {
            return history.push("/auth/log-in");
        }

        const token = localStorage.getItem("authToken");
        const currUserId = userId;

        const hasUserLikedArtwork = checkUserIdInArr(currUserId, likes);

        if (!hasUserLikedArtwork) {
            addLike(id, token);
        } else {
            const likeId = getLikeId(currUserId, likes);
            
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

            // Delete from db
            await response.json();

            // Update local state
            const updatedLikes = likes.filter(likeObj => likeObj.like_id !== likeId);
            
            setLikes(updatedLikes);

        } catch (err) {
            console.error(err);
        }
    }

    // Helper func
    function getLikeId(userId, likesArr) {
        const liked = likesArr.filter(obj => obj.user_id === userId);

        return liked[0].like_id;
    }

    // ArtworkComments comp behaviors //
    async function handleCommentSubmit(event) {
        event.preventDefault();

        const artworkId = id;
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`/api/artworks/${artworkId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: commentText
                })
            });

            // Entire comments data array back
            const { commentsData } = await response.json();

            // Update state
            setComments(commentsData);
            // Clear form input
            setCommentText("");
            
        } catch (err) {
            console.error(err);
        }
    }

    async function handleRemoveComment(event) {
        event.preventDefault();

        const artworkId = id;
    }

    return (
        <main className="artwork-view">
            <ArtworkInfo artworkData={artworkData} likes={likes} updateLikes={updateLikes} favorites={favorites} />
            <ArtworkComments comments={comments} isLoggedIn={isLoggedIn} userId={userId} commentText={commentText} setCommentText={setCommentText} handleCommentSubmit={handleCommentSubmit} />
        </main>
    );
}

export default ArtworkView;

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";

import "./ArtworkView.css";
import { AuthContext } from "../../../contexts/AuthContext";
import checkUserIdInArr from "../../../utils/check-user-id-in-arr";
import ArtworkInfo from "./artwork-info/ArtworkInfo";
import ArtworkComments from "./artwork-comments/ArtworkComments";

function ArtworkView() {
    const { id } = useParams();
    const { isLoggedIn, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    // State
    const [artworkData, setArtworkData] = useState({
        artworkId: 0,
        userId: 0,
        title: "",
        description: "",
        artworkCreatedAt: "",
        username: "",
        avatarImgUrl: "",
        genre: "",
        imgUrl: "",
        imgWidth: 0,
        imgHeight: 0,
        imgAltTxt: ""
    });
    const [likes, setLikes] = useState([]);
    const [currUserHasLiked, setCurrUserHasLiked] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [currUserHasFavorited, setCurrUserHasFavorited] = useState(false);
    // User Comments state
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    // Init data fetch
    useEffect(() => {
        fetch(`/api/artworks/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                setArtworkData({
                    artworkId: data.artwork_id,
                    userId: data.user_id,
                    title: data.title,
                    description: data.description,
                    artworkCreatedAt: data.artwork_created_at,
                    username: data.username,
                    avatarImgUrl: data.avatar_img_url,
                    genre: data.genre,
                    imgUrl: data.img_url,
                    imgWidth: data.img_width,
                    imgHeight: data.img_height,
                    imgAltTxt: data.img_alt_txt
                });
                setLikes(data.likes);
                setFavorites(data.favorites);
                setComments(data.comments);
            })
            .catch((err) => console.error(err));
    }, [id, userId]);

    useEffect(() => {
        // Check if currently logged in user has liked artwork or not
        const hasUserLiked = checkUserIdInArr(userId, likes);

        setCurrUserHasLiked(hasUserLiked);
    }, [userId, likes]);
    
    useEffect(() => {
        // Check if curr user has favorited artwork
        const hasUserFavorited = checkUserIdInArr(userId, favorites);

        setCurrUserHasFavorited(hasUserFavorited);
    }, [userId, favorites]);

    // ArtworkInfo comp behaviors //
    async function updateLikes() {
        // Checked logged in first
        if (!isLoggedIn) {
            return navigate("/auth/log-in");
        }

        const token = localStorage.getItem("authToken");
        const currUserId = userId;

        if (!currUserHasLiked) {
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
            const updatedLikes = likes.filter((likeObj) => likeObj.like_id !== likeId);
            
            setLikes(updatedLikes);

        } catch (err) {
            console.error(err);
        }
    }

    // Helper funcs
    function getLikeId(userId, likesArr) {
        const liked = likesArr.filter((obj) => obj.user_id === userId);

        return liked[0].like_id;
    }

    function getFavId(userId, favsArr) {
        const favorited = favsArr.filter((obj) => obj.user_id === userId);

        return favorited[0].favorite_id;
    }

    // Artwork Favorites //
    async function updateFavorites() {
        // Checked logged in first
        if (!isLoggedIn) {
            return navigate("/auth/log-in");
        }

        const token = localStorage.getItem("authToken");
        const currUserId = userId;

        if (!currUserHasFavorited) {
            addFavorite(id, token);
        } else {
            const favoriteId = getFavId(currUserId, favorites);
            
            removeFavorite(id, favoriteId, token);
        }
    }

    async function addFavorite(artworkId, authToken) {
        try {
            const response = await fetch(`/api/artworks/${artworkId}/favorites`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });

            const { favoriteData } = await response.json();
            // Update state
            setFavorites([...favorites, favoriteData]);
            
        } catch (err) {
            console.error(err);
        }
    }

    async function removeFavorite(artworkId, favoriteId, authToken) {
        try {
            const response = await fetch(`/api/artworks/${artworkId}/favorites/${favoriteId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });

            // Delete from db
            await response.json();

            // Update local state
            const updatedfavorites = favorites.filter((favoriteObj) => favoriteObj.favorite_id !== favoriteId);
            
            setFavorites(updatedfavorites);

        } catch (err) {
            console.error(err);
        }
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

    async function handleRemoveComment(commentId) {
        const artworkId = id;
        const token = localStorage.getItem("authToken");

        try {
            // Delete from db
            await fetch(`/api/artworks/${artworkId}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Delete from local state
            const updatedComments = comments.filter((comment) => comment.comment_id !== commentId);

            setComments(updatedComments);

        } catch (err) {
            console.error(err);
        }

    }

    return (
        <main className="artwork-view">
            <ArtworkInfo
                artworkData={artworkData}
                likes={likes}
                updateLikes={updateLikes}
                currUserHasLiked={currUserHasLiked}
                favorites={favorites}
                updateFavorites={updateFavorites}
                currUserHasFavorited={currUserHasFavorited}
            />
            <ArtworkComments
                comments={comments}
                isLoggedIn={isLoggedIn}
                userId={userId}
                commentText={commentText}
                setCommentText={setCommentText}
                handleCommentSubmit={handleCommentSubmit}
                handleRemoveComment={handleRemoveComment}
            />
        </main>
    );
}

export default ArtworkView;

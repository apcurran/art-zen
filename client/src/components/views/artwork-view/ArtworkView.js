import { useState, useEffect } from "react";
import { useParams } from "react-router";

import "./ArtworkView.css";
import ArtworkInfo from "./artwork-info/ArtworkInfo";
import ArtworkComments from "./artwork-comments/ArtworkComments";

function ArtworkView() {
    const { id } = useParams();
    
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

    return (
        <main className="artwork-view">
            <ArtworkInfo artworkData={artworkData} likes={likes} setLikes={setLikes} favorites={favorites} />
            <ArtworkComments comments={comments} />
        </main>
    );
}

export default ArtworkView;

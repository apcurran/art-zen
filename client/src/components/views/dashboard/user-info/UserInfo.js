import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../../../contexts/AuthContext";

function UserInfo() {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [avatarImgUrl, setAvatarImgUrl] = useState("");

    const { userId } = useContext(AuthContext);
    const token = localStorage.getItem("authToken"); 

    useEffect(() => {
        fetch(`/api/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
                setDescription(data.bio_description);
                setAvatarImgUrl(data.avatar_img_url);
            });
    }, []);

    return (
        <div>
            User Info
        </div>
    );
}

export default UserInfo;

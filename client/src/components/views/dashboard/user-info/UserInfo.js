import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../../../contexts/AuthContext";

function UserInfo() {
    const [username, setUsername] = useState("");
    const [bioDesc, setBioDesc] = useState("");
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
                setBioDesc(data.bio_description);
                setAvatarImgUrl(data.avatar_img_url);
            });
    }, [userId, token]);

    // Form
    async function handleSubmit(event) {
        event.preventDefault();

        
    }

    return (
        <main>
            <h1>Welcome back, {username}!</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bioDesc">Bio Description:</label>
                    <textarea value={bioDesc} onChange={(event) => setBioDesc(event.target.value)} id="bioDesc" name="bioDesc" cols="30" rows="10"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="avatarImg">Avatar Img:</label>
                    <input type="file" name="avatarImg" id="avatarImg"/>
                </div>
                <button type="submit">Update</button>
            </form>
        </main>
    );
}

export default UserInfo;

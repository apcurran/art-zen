import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../../../contexts/AuthContext";

function UserInfo() {
    const [username, setUsername] = useState("");
    const [bioDesc, setBioDesc] = useState("");
    const [selectedImgFile, setSelectedImgFile] = useState(null);

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
            });
    }, [userId, token]);

    // Form
    async function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append("bioDesc", bioDesc);
        formData.append("avatarImg", selectedImgFile);

        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

        } catch (err) {
            console.error(err);
        }
    }

    function handleFileChange(event) {
        setSelectedImgFile(event.target.files[0]);
    }

    return (
        <main>
            <h1>Welcome back, {username}!</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="bioDesc">Bio Description:</label>
                    <textarea value={bioDesc} onChange={(event) => setBioDesc(event.target.value)} id="bioDesc" name="bioDesc" cols="30" rows="10"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="avatarImg">Avatar Img:</label>
                    <input onChange={handleFileChange} type="file" name="avatarImg" id="avatarImg"/>
                </div>
                <button type="submit">Update</button>
            </form>
        </main>
    );
}

export default UserInfo;

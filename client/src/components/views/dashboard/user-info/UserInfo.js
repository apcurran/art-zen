import { useState, useEffect } from "react";

import "./UserInfo.css";

function UserInfo({ userId, token }) {
    const [username, setUsername] = useState("");
    const [bioDesc, setBioDesc] = useState("");
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [message, setMessage] = useState("");

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
            })
            .catch(err => console.error(err));
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
            const responseMsg = (await response.json()).message;

            setMessage(responseMsg);

        } catch (err) {
            console.error(err);
        }
    }

    function handleFileChange(event) {
        setSelectedImgFile(event.target.files[0]);
    }

    return (
        <section>
            <h2 className="dashboard-user-info-title">Welcome back, {username}!</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="dashboard-user-info">
                <div className="dashboard-user-info__form-group">
                    <label className="dashboard-user-info__label" htmlFor="bioDesc">Bio Description</label>
                    <textarea className="dashboard-user-info__textarea" value={bioDesc} onChange={(event) => setBioDesc(event.target.value)} id="bioDesc" name="bioDesc" cols="30" rows="10"></textarea>
                </div>
                <div className="dashboard-user-info__form-group">
                    <label className="dashboard-user-info__label" htmlFor="avatarImg">Upload Avatar Img</label>
                    <input className="dashboard-user-info__input dashboard-user-info__input--file" onChange={handleFileChange} type="file" name="avatarImg" id="avatarImg"/>
                </div>
                <button type="submit" className="dashboard-user-info__submit-btn cta-btn">Update</button>
                {message ? (
                    <p className="dashboard-user-info__response-msg msg">{message}</p>
                ) : null}
            </form>
        </section>
    );
}

export default UserInfo;

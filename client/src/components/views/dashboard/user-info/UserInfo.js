import { useState, useEffect, useRef } from "react";

import "./UserInfo.css";

import Loader from "../../../loader/Loader";

function UserInfo({ userId, token }) {
    const [username, setUsername] = useState("");
    const [bioDesc, setBioDesc] = useState("");

    // Cloudinary data
    const [avatarInfo, setAvatarInfo] = useState(null);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const widgetRef = useRef();

    useEffect(() => {
        // current user data
        fetch(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username);
                setBioDesc(data.bio_description);
            })
            .catch((err) => setError(err.message));

        // init Cloudinary widget
        if (!window.cloudinary) {
            setMessage("Cloudinary is not available.");

            return;
        }

        widgetRef.current = window.cloudinary.createUploadWidget(
            {
                cloudName: "dev-project",
                apiKey: "365584668378597",
                uploadPreset: "art-zen-app-react-widget",
                folder: "art-zen-app/user-avatars",
                uploadSignature: async (cb, params_to_sign) => {
                    const response = await fetch("/api/cloudinary/sign", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ paramsToSign: params_to_sign }),
                    });
                    const data = await response.json();
                    cb(data.signature);
                },
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    setAvatarInfo(result.info);
                    setMessage(
                        "Avatar image uploaded; click update to save changes",
                    );
                }
            },
        );
    }, [userId, token]);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        // Reset err msg
        setError("");

        const payload = {
            bioDesc,
            avatar_public_id: avatarInfo ? avatarInfo.public_id : null,
        };
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const data = await response.json();
            // Set user message for 7 seconds
            setMessage(data.message);
            setTimeout(() => setMessage(""), 7000);
            setAvatarInfo(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2 className="dashboard-user-info-title">
                Welcome back, {username}!
            </h2>
            <form
                onSubmit={handleSubmit}
                className="dashboard-user-info dashboard-form"
            >
                <div className="dashboard-user-info__form-group dashboard-form__group">
                    <label
                        className="dashboard-user-info__label dashboard-form__label"
                        htmlFor="bioDesc"
                    >
                        Bio Description
                    </label>
                    <textarea
                        className="dashboard-user-info__textarea dashboard-form__textarea"
                        value={bioDesc}
                        onChange={(event) => setBioDesc(event.target.value)}
                        id="bioDesc"
                        name="bioDesc"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <div className="dashboard-user-info__form-group dashboard-form__group">
                    <button
                        type="button"
                        className="cta-btn"
                        onClick={() => widgetRef.current.open()}
                    >
                        {avatarInfo
                            ? "Change Avatar"
                            : "Upload New Avatar Image"}
                    </button>
                </div>
                <button
                    type="submit"
                    className="dashboard-user-info__submit-btn cta-btn"
                >
                    Update
                </button>
                {loading ? <Loader /> : null}
                {message ? (
                    <p className="dashboard-user-info__response-msg msg">
                        {message}
                    </p>
                ) : null}
                {error ? <p className="error">{error}</p> : null}
            </form>
        </section>
    );
}

export default UserInfo;

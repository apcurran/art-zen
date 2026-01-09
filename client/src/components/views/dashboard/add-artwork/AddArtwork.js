import { useState, useRef, useEffect, useContext } from "react";

import "./AddArtwork.css";
import { DiscoverArtworksContext } from "../../../../contexts/DiscoverArtworksContext";
import Loader from "../../../../components/loader/Loader";

function AddArtwork({ token }) {
    const { artworks, setArtworks } = useContext(DiscoverArtworksContext);

    // basic form state
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("fantasy");
    const [description, setDescription] = useState("");
    const [altTxt, setAltTxt] = useState("");
    // cloudinary info state
    const [cloudinaryInfo, setCloudinaryInfo] = useState(null);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // refs
    const widgetRef = useRef();

    useEffect(() => {
        if (!window.cloudinary) {
            setMessage("Error: Cloudinary is not available.");
        }
        // setup cloudinary
        widgetRef.current = window.cloudinary.createUploadWidget(
            {
                cloudName: "dev-project",
                apiKey: "365584668378597",
                uploadPreset: "art-zen-app-react-widget", // signed ON
                folder: "art-zen-app",
                // signature from back-end
                uploadSignature: async (cb, params_to_sign) => {
                    // send out a req to my server to get signature for authorized uploads
                    const response = await fetch("/api/cloudinary/sign", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            paramsToSign: params_to_sign,
                        }),
                    });
                    const data = await response.json();
                    cb(data.signature);
                },
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    // store data in local state, then form submission
                    setCloudinaryInfo(result.info);
                    setMessage(
                        "Image uploaded; complete the form, then submit to finish",
                    );
                }
            },
        );
    }, [token]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!cloudinaryInfo) {
            setError("Please upload your image before submitting.");

            return;
        }

        setLoading(true);
        // Reset err msg
        setError("");

        try {
            const response = await fetch("/api/artworks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    genre,
                    altTxt,
                    public_id: cloudinaryInfo.public_id,
                    width: cloudinaryInfo.width,
                    height: cloudinaryInfo.height,
                }),
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { addedArtwork } = await response.json();

            setMessage("Your new artwork was successfully uploaded!");
            setTimeout(() => setMessage(""), 7000);

            // Set Global Context State
            setArtworks([addedArtwork, ...artworks]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2 className="add-artwork-title">Add New Artwork</h2>
            <form
                onSubmit={handleSubmit}
                className="add-artwork-form dashboard-form"
            >
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label
                        htmlFor="title"
                        className="add-artwork-form__label dashboard-form__label"
                    >
                        Artwork Title
                    </label>
                    <input
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                        type="text"
                        id="title"
                        className="add-artwork-form__input dashboard-form__input input--short"
                        required
                    />
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label
                        htmlFor="genre"
                        className="add-artwork-form__label dashboard-form__label"
                    >
                        Artwork Genre
                    </label>
                    <select
                        onChange={(event) => setGenre(event.target.value)}
                        value={genre}
                        id="genre"
                        className="add-artwork-form__input dashboard-form__input input--short"
                    >
                        <option value="fantasy">Fantasy</option>
                        <option value="landscape">Landscape</option>
                        <option value="realism">Realism</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="anime">Anime</option>
                        <option value="horror">Horror</option>
                        <option value="modern">Modern</option>
                        <option value="portrait">Portrait</option>
                    </select>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label
                        htmlFor="description"
                        className="add-artwork-form__label dashboard-form__label"
                    >
                        Artwork Description
                    </label>
                    <textarea
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        className="add-artwork-form__textarea dashboard-form__textarea"
                        required
                    ></textarea>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    {/* BUTTON TO TRIGGER CLOUDINARY WIDGET */}
                    <button
                        type="button"
                        className="cta-btn"
                        onClick={() => widgetRef.current.open()}
                    >
                        {cloudinaryInfo ? "Change Artwork" : "Upload Image"}
                    </button>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label
                        htmlFor="artwork-img-alt-txt"
                        className="add-artwork-form__label dashboard-form__label"
                    >
                        Short Image Description
                    </label>
                    <input
                        onChange={(event) => setAltTxt(event.target.value)}
                        type="text"
                        name="altTxt"
                        id="artwork-img-alt-txt"
                        className="add-artwork-form__input dashboard-form__input input--long"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="add-artwork-form__submit-btn cta-btn"
                >
                    Upload
                </button>
                {loading ? <Loader /> : null}
                {message ? (
                    <p className="add-artwork-form__message msg">{message}</p>
                ) : null}
                {error ? <p className="error">{error}</p> : null}
            </form>
        </div>
    );
}

export default AddArtwork;

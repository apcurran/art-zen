import { useState, useContext } from "react";

import "./AddArtwork.css";
import { DiscoverArtworksContext } from "../../../../contexts/DiscoverArtworksContext";
import Loader from "../../../../components/loader/Loader";

function AddArtwork({ token }) {
    const { artworks, setArtworks } = useContext(DiscoverArtworksContext);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("fantasy");
    const [description, setDescription] = useState("");
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [altTxt, setAltTxt] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        // Reset err msg
        setError("");

        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("artworkImg", selectedImgFile);
        formData.append("altTxt", altTxt);

        try {
            const response = await fetch("/api/artworks", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { addedArtwork } = await response.json();

            setLoading(false);
            setMessage("Your new artwork was successfully uploaded!");
            setTimeout(() => setMessage(""), 7000);

            // Set Global Context State
            setArtworks([addedArtwork, ...artworks]);

        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }

    return (
        <div>
            <h2 className="add-artwork-title">Add New Artwork</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-artwork-form dashboard-form">
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="title" className="add-artwork-form__label dashboard-form__label">Artwork Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} value={title} type="text" id="title" className="add-artwork-form__input dashboard-form__input input--short" required />
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="genre" className="add-artwork-form__label dashboard-form__label">Artwork Genre</label>
                    <select onChange={(event) => setGenre(event.target.value)} value={genre} type="text" id="genre" className="add-artwork-form__input dashboard-form__input input--short">
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
                    <label htmlFor="description" className="add-artwork-form__label dashboard-form__label">Artwork Description</label>
                    <textarea onChange={(event) => setDescription(event.target.value)} value={description} name="description" id="description" cols="30" rows="10" className="add-artwork-form__textarea dashboard-form__textarea" required></textarea>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="artwork-img" className="add-artwork-form__label dashboard-form__label">Upload Artwork Image</label>
                    <input onChange={(event) => setSelectedImgFile(event.target.files[0])} type="file" name="artworkImg" id="artwork-img" className="add-artwork-form__input add-artwork-form__input--file" required />
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="artwork-img-alt-txt" className="add-artwork-form__label dashboard-form__label">Short Image Description</label>
                    <input onChange={(event) => setAltTxt(event.target.value)} type="text" name="altTxt" id="artwork-img-alt-txt" className="add-artwork-form__input dashboard-form__input input--long" required />
                </div>
                <button type="submit" className="add-artwork-form__submit-btn cta-btn">Upload</button>
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

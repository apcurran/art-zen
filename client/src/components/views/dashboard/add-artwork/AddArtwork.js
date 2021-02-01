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
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("artworkImg", selectedImgFile);

        try {
            const response = await fetch("/api/artworks", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const { addedArtwork } = await response.json();

            setLoading(false);
            setMessage("Your new artwork was successfully uploaded!");
            setTimeout(() => setMessage(""), 7000);

            // Set Global Context State
            setArtworks([addedArtwork, ...artworks]);

        } catch (err) {
            setLoading(false);

            console.error(err);
        }
    }

    return (
        <div>
            <h2 className="add-artwork-title">Add New Artwork</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-artwork-form dashboard-form">
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="title" className="add-artwork-form__label dashboard-form__label">Artwork Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} value={title} type="text" id="title" className="add-artwork-form__input dashboard-form__input"/>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="genre" className="add-artwork-form__label dashboard-form__label">Artwork Genre</label>
                    <select onChange={(event) => setGenre(event.target.value)} value={genre} type="text" id="genre" className="add-artwork-form__input dashboard-form__input">
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
                    <textarea onChange={(event) => setDescription(event.target.value)} value={description} name="description" id="description" cols="30" rows="10" className="add-artwork-form__textarea dashboard-form__textarea"></textarea>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="artwork-img" className="add-artwork-form__label dashboard-form__label">Upload Artwork Image</label>
                    <input onChange={(event) => setSelectedImgFile(event.target.files[0])} type="file" name="artworkImg" id="artwork-img" className="add-artwork-form__input add-artwork-form__input--file"/>
                </div>
                <button type="submit" className="add-artwork-form__submit-btn cta-btn">Upload</button>
                {loading ? <Loader /> : null}
                {message ? (
                    <p className="add-artwork-form__message msg">{message}</p>
                ) : null}
            </form>
        </div>
    );
}

export default AddArtwork;

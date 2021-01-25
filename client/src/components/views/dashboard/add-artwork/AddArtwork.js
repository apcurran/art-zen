import { useState } from "react";

import "./AddArtwork.css";

function AddArtwork({ token }) {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImgFile, setSelectedImgFile] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

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
            const responseMsg = await response.json();
            console.log(responseMsg);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h2>Add New Artwork</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-artwork-form dashboard-form">
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="title" className="add-artwork-form__label dashboard-form__label">Artwork Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} value={title} type="text" id="title" className="add-artwork-form__input dashboard-form__input"/>
                </div>
                <div className="add-artwork-form__form-group dashboard-form__group">
                    <label htmlFor="genre" className="add-artwork-form__label dashboard-form__label">Artwork Genre</label>
                    <input onChange={(event) => setGenre(event.target.value)} value={genre} type="text" id="genre" className="add-artwork-form__input dashboard-form__input"/>
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
            </form>
        </div>
    );
}

export default AddArtwork;

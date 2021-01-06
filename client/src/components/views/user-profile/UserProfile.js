import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./UserProfile.css";

function UserProfile() {
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/artworks/users/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div>
            User Profile for {id}
        </div>
    );
}

export default UserProfile;

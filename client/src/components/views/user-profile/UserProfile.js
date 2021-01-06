import { useParams } from "react-router-dom";

import "./UserProfile.css";

function UserProfile() {
    const { id } = useParams();

    return (
        <div>
            User Profile for {id}
        </div>
    );
}

export default UserProfile;

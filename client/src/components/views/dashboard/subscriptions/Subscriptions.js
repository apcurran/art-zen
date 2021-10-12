import { useState, useEffect } from "react";

import "./Subscriptions.css";
import SubscriptionCard from "../subscription-card/SubscriptionCard";

function Subscriptions({ userId, token }) {
    const [subscripArtworks, setSubscripArtworks] = useState([]);
    
    useEffect(() => {
        fetch(`/api/users/${userId}/subscriptions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setSubscripArtworks(data.subscriptionsArtworks))
            .catch((err) => console.error(err));
    }, [userId, token]);

    return (
        <div>
            <section className="subscriptions-grid">
                {subscripArtworks.map((artwork) => (
                    <SubscriptionCard artwork={artwork} key={artwork.artwork_id} />
                ))}
            </section>
        </div>
    );
}

export default Subscriptions;

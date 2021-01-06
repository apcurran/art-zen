import "./ArtworkComments.css";

function ArtworkComments({ comments }) {
    return (
        <div>
            <section className="artwork-view__comments-total">
                <span className="artwork-view__comments-total__title">Comments</span>
                <span className="dot">&bull;</span>
                <span className="artwork-view__comments-total__amt">{comments.length}</span>
            </section>
            <section className="artwork-view__comments">
                <div className="artwork-view__comments__user__logged-out">
                    <span className="artwork-view__comments__user__logged-out__avatar">
                        <svg class="user-avatar-default-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </span>
                    <p className="artwork-view__comments__user__logged-out__desc">
                    Join the Art Zen community to post your comment. If you are already a member, <span>Log In</span>.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default ArtworkComments;

import "./UserCommentForm.css";

function UserCommentForm({ commentText, setCommentText, handleCommentSubmit }) {
    return (
        <form onSubmit={handleCommentSubmit} className="artwork-view__comments__form">
            <div className="artwork-view__comments__form__group">
                <label htmlFor="comment" className="artwork-view__comments__form__label">Your Comment</label>
                <textarea onChange={(event) => setCommentText(event.target.value)} value={commentText} name="comment" id="comment" rows="6" className="artwork-view__comments__form__textarea"></textarea>
            </div>
            <button type="submit" className="artwork-view__comments__form__submit-btn cta-btn">Submit</button>
        </form>
    );
}

export default UserCommentForm;

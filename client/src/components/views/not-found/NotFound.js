import "./NotFound.css";
import NotFoundFeelingBlue from "./imgs/illustration-not-found-feeling-blue.svg";

function NotFound() {
    return (
        <main className="not-found">
            <h1 className="not-found__title">Oops! The resource you requested was not found.</h1>
            <figure className="not-found__fig">
                <img src={NotFoundFeelingBlue} alt="Illustration of a frowny-face and a woman looking sad." className="not-found__fig__img" width="1100" height="811"/>
            </figure>
        </main>
    );
}

export default NotFound;

import "./About.css";

function About() {
    return (
        <main className="main-about">
            <section className="main-about__section">
                <figure className="main-about__section__fig">
                    img here
                </figure>
                <div className="main-about__section__content">
                    <h2 className="main-about__section__title">
                        Discover new artists from around the world.
                    </h2>
                    <p className="main-about__section__desc">
                        Art Zen has fresh artwork added daily by artists just like you. We provide a source of inspiration, any time of day.
                    </p>
                </div>
            </section>
            <section className="main-about__section">
                <div className="main-about__section__content">
                    <h2 className="main-about__section__title">
                        Connect with your friends, and make some new ones.
                    </h2>
                    <p className="main-about__section__desc">
                        Share your struggles and challenges, post tips on other artists' pages, or show some love by favoriting a piece you like.
                    </p>
                </div>
                <figure className="main-about__section__fig">img here</figure>
            </section>
            <section className="main-about__section">
                <figure className="main-about__section__fig">img here</figure>
                <div className="main-about__section__content">
                    <h2 className="main-about__section__title">
                        Join now to share your masterpiece with the world!
                    </h2>
                    <p className="main-about__section__desc">
                        Join a fun community of helpful people who want to grow their art skills everyday!
                    </p>
                </div>
            </section>
        </main>
    );
}

export default About;

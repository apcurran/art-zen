import "./About.css";
import ArtMuseumIllustration from "./imgs/illustration-art-museum-opt.svg";
import SharingArticlesIllustration from "./imgs/illustration-sharing-articles-opt.svg";
import MonsterArtistIllustration from "./imgs/illustration-monster-artist-opt.svg";

function About() {
    return (
        <main className="main-about">
            <section className="main-about__section">
                <figure className="main-about__section__fig">
                    <img src={ArtMuseumIllustration} alt="Illustration of a man staring at art in a museum." width="1046" height="639" decoding="async" className="main-about__section__fig__img"/>
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
            <svg className="wave-svg wave-svg--top" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path className="wavePath-haxJK1" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path></svg>
            <section className="main-about__section">
                <div className="main-about__section__content">
                    <h2 className="main-about__section__title">
                        Connect with your friends, and make some new ones.
                    </h2>
                    <p className="main-about__section__desc">
                        Share your struggles and challenges, post tips on other artists' pages, or show some love by favoriting a piece you like.
                    </p>
                </div>
                <figure className="main-about__section__fig">
                    <img src={SharingArticlesIllustration} alt="Man and a woman text artwork to each other." width="989" height="766" loading="lazy" decoding="async" className="main-about__section__fig__img"/>
                </figure>
            </section>
            <svg className="wave-svg wave-svg--bottom" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path className="wavePath-haxJK1" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path></svg>
            <section className="main-about__section">
                <figure className="main-about__section__fig">
                    <img src={MonsterArtistIllustration} alt="Monster with a mustache displays artwork with orange circles." width="738" height="401" loading="lazy" decoding="async" className="main-about__section__fig__img"/>
                </figure>
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

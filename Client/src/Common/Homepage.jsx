import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "../css/homepage.module.css";
import logo from "../../Assets/Logo.png";
import heroImg from "../../Assets/HomeImage.png";
import { useAuth0 } from "@auth0/auth0-react";

function Homepage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const token = localStorage.getItem("Token");

  if (isAuthenticated) {
    localStorage.setItem("Email", user.email);
    localStorage.setItem("Token", getAccessTokenSilently());
  }

  useEffect(() => {
    if (token || isAuthenticated) {
      navigate("/DesignPage");
    }
  }, [token, isAuthenticated]);

  return (
    <div className={css.container}>
      {/* Navbar */}
      <nav className={css.navbar}>
        <img src={logo} alt="Build Vision Logo" className={css.navLogo} />
        <div className={css.navLinks}>
          <Link to="/Login" className={css.navLink}>Login</Link>
          <Link to="/Signup" className={`${css.navLink} ${css.highlightLink}`}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={css.heroSection}>
        {/* Left Content */}
        <div className={css.heroText}>
          <h1 className={css.mainHeading}>
            Build Your Vision with <span className={css.brandHighlight}>Build Vision</span>
          </h1>
          <p className={css.subText}>
            The ultimate platform for architecture enthusiasts! Explore iconic
            designs, connect with creative minds, and transform your ideas into
            reality.
          </p>
          <div className={css.ctaButtons}>
            <Link to="/Signup">
              <button className={`${css.btn} ${css.primaryBtn}`}>Get Started</button>
            </Link>
            <a href="#features">
              <button className={`${css.btn} ${css.secondaryBtn}`}>Learn More</button>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className={css.heroImageWrapper}>
          <img src={heroImg} alt="Architecture Showcase" className={css.heroImg} />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className={css.featuresSection}>
        <h2 className={css.featuresHeading}>Why Choose Build Vision?</h2>
        <div className={css.featureCards}>
          <div className={css.featureCard}>
            <h3 className={css.cardTitle}>Explore Designs</h3>
            <p className={css.cardText}>
              Discover stunning architectural marvels and trends from around the globe.
            </p>
          </div>
          <div className={css.featureCard}>
            <h3 className={css.cardTitle}>Collaborate</h3>
            <p className={css.cardText}>
              Connect with architects, designers, and enthusiasts in our vibrant community.
            </p>
          </div>
          <div className={css.featureCard}>
            <h3 className={css.cardTitle}>Innovate</h3>
            <p className={css.cardText}>
              Turn your vision into reality with tools to bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={css.footer}>
        <p>&copy; 2024 Build Vision. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;

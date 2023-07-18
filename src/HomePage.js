import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1 className="homepage-title">Hi, I am</h1>
        <h2 className="homepage-name">Dipendra Pahadi</h2>
        <p className="homepage-description">React Developer</p>
        <a href="/portfolio" className="portfolio-btn">View Portfolio Tracker</a>
      </div>
    </div>
  );
}

export default HomePage;

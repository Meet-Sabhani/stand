import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-left">
        <div className="footer-line">
          <h3>VENUSS</h3>
          <p>
            <a href="#">about</a>
          </p>
          <p>
            <a href="#">about</a>
          </p>
          <p>
            <a href="#">about</a>
          </p>
        </div>
        <div className="footer-line">
          <h3>For</h3>
          <p>
            <a href="#">About</a>
          </p>
          <p>
            <a href="#">Blog</a>
          </p>
          <p>
            <a href="#">Podcast</a>
          </p>
          <p>
            <a href="#">Documentation</a>
          </p>
        </div>
        <div className="footer-line">
          <h3>Social</h3>
          <p>
            <a href="#">Teams</a>
          </p>
          <p>
            <a href="#">Privet</a>
          </p>
          <p>
            <a href="#">Hosting</a>
          </p>
        </div>
        <div className="footer-line">
          <h3>Community</h3>
          <p>
            <a href="#">YouTube</a>
          </p>
          <p>
            <a href="#">Twiter</a>
          </p>
          <p>
            <a href="#">instagram</a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <h1>VENUSS</h1>
        <p>&copy;2024 Meet Sabhani</p>
      </div>
    </footer>
  );
};

export default Footer;

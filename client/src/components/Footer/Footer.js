import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-light">
      <Container>
        <Row>
          <Col lg={6} className="footer-info">
            <div className="mb-4">
              <h3>Connect with Us</h3>
              <p>
                Thank you for visiting Invoicify. Stay connected with us on
                social platforms.
              </p>
            </div>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/maheshchaudhary63/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a
                href="https://github.com/MaheshChoudhary063"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
              >
                <i className="fab fa-github"></i> GitHub
              </a>
              <a
                href="https://www.instagram.com/maheshchoudharry/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </Col>
          <Col lg={6} className="contact-info">
            <div className="mb-4">
              <h3>Contact Info</h3>
              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-envelope"></i>{" "}
                  <a
                    href="mailto:maheshchoudhary0603@gmail.com"
                    className="email-link"
                  >
                    maheshchoudhary0603@gmail.com
                  </a>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i> India-342802
                </li>
              </ul>
              <p>
                Visit my{" "}
                <a
                  href="https://port-folio-liard-eight.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  portfolio
                </a>{" "}
                for more information.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-4">
        <p>© {new Date().getFullYear()} Invoicify. All rights reserved. @Mahesh Chaudhary</p>
      </div>
    </footer>
  );
};

export default Footer;

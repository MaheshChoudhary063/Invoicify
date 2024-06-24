import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import me from '../../assests/Me.png' ;

const AboutUs = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">About Me</h2>
          <p>
            I am a passionate developer based in Jodhpur, India. With a strong
            foundation in web development technologies, I specialize in building
            scalable and efficient web applications using modern frameworks like
            React.js.
          </p>
          <p>
            I love to explore new technologies and contribute to open-source
            projects. My goal is to leverage technology to create meaningful
            solutions that positively impact people's lives.
          </p>
          <p>
            Feel free to connect with me on social media or check out my
            portfolio for more information about my work and projects.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={4} className="text-center">
          <img
            src={me}
            alt="Mahesh choudhary"
            className="img-fluid rounded-circle mb-4"
          />
          <h4>Mahesh Choudhary</h4>
          <p>Full Stack Developer</p>
          <p>
            {" "}
            <a
              href="mailto:maheshchoudhary0603@gmail.com"
              className="email-link"
            >
              maheshchoudhary0603@gmail.com
            </a>
          </p>
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
      </Row>
    </Container>
  );
};

export default AboutUs;

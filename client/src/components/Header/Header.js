import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section text-center text-white bg-dark py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-md-start mb-4 mb-md-0">
              <h1 className="display-4 fw-bold">
                Easiest Invoicing for Freelancers and Small Businesses
              </h1>
              <p className="lead mt-4">
                Free and Open Source Invoicing application made with MongoDB,
                Express, React & Node.js
              </p>
              <Link to="/create-invoice">
                <Button variant="primary" size="lg" className="mt-3">
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <img
                src="https://res.cloudinary.com/almpo/image/upload/v1637241441/special/banner_izy4xm.png"
                alt="invoicing-app"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="additional-section text-center py-5">
        <Container>
          <h2>Why Choose Our Invoicing Application?</h2>
          <Row className="mt-4">
            <Col>
              <h4>Easy to Use</h4>
              <p>
                Our intuitive interface is tailored for freelancers and small
                businesses, making it easy to create and manage invoices.
              </p>
            </Col>
            <Col>
              <h4>Professional Invoices</h4>
              <p>
                Generate professional-looking invoices in minutes, ensuring a
                polished and credible image for your business.
              </p>
            </Col>
            <Col>
              <h4>Accessible Anywhere</h4>
              <p>
                Access your invoicing system from anywhere, anytime, on any
                device with internet access, giving you the flexibility to
                manage your business on the go.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;

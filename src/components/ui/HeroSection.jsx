import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

import heroImg from "../../assets/images/bg.png";

const HeroSection = () => {
  return (
    <section className="hero__section" style={{marginBottom: 50}}>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 style={{display: "inline" }}>
                Discover NFT collections, buy & sell extraordinary
                <span style={{display: 'inline'}}> NFTs</span> 
              </h2>
              <p className="des">
                A place to interact with Blockchain technology by minting & selling NFTs.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p>© 2025 RideSync App | All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

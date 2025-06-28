import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Menu from '../Menu';
import './Layout.css';

function Layout() {
  return (
    <Container className="p-0">
      <Row>
        <Col lg={12}>
          <Menu />
        </Col>
      </Row>
      <Row className="custom-padding-bottom">
        <Col className="p-4 pt-5" lg={12}>
          <Outlet />
        </Col>
      </Row>

      <Row className="fixed-bottom bg-dark custom-toggler shadow-sm footer mt-auto py-3">
        <Col lg={12} className="d-flex justify-content-center">
          <span className="fs-6 ms-2 text-white">React Bootstrap</span>
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;

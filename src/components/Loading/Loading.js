import React from 'react';

import { Col, Row, Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <Row>
      <Col className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}

export default Loading;

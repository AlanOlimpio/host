import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './Menu.css';
import Logo from '../Logo';

function Menu() {
  const navegate = useNavigate();

  return (
    <Navbar
      expand="lg"
      className="bg-dark custom-toggler shadow-sm"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <Logo />
          <span className="fs-6 ms-2 text-white">Module Federation</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="text-light border-light"
        />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
            variant="underline"
            defaultActiveKey="/"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="1"
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                onClick={() => navegate('/')}
              >
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="2"
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                onClick={() => navegate('/list')}
              >
                List
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="3"
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                onClick={() => navegate('/register')}
              >
                Register
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect className="navbar" data-bs-theme="dark" variant="underline">
      <Container>
        <div>
          <Link passHref href="/">
            <Navbar.Brand>My Practice Pal</Navbar.Brand>
          </Link>
        </div>
        <div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link passHref href="/">
                <Nav.Link>My Dashboard</Nav.Link>
              </Link>
              <Link passHref href="/achievements">
                <Nav.Link>My Achievements</Nav.Link>
              </Link>
              <Link passHref href="/music/new">
                <Nav.Link>Add Something New</Nav.Link>
              </Link>
              <Button className="btn-orange" variant="dark" onClick={signOut}>Sign Out</Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

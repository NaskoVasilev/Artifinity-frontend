import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';

import classes from './Header.module.scss';

const Header = (props) => {
    return (
        <Navbar className={classes.Header} variant="light">
            <Container fluid>
                <Navbar.Brand href="/">Artifinity</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Collapse className="justify-content-end">
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
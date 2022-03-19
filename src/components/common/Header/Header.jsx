import { useStoreState } from 'easy-peasy';
import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Wallet } from 'react-bootstrap-icons';
import { trimAddress } from '../../../utils/web3Utils';

import classes from './Header.module.scss';

const Header = (props) => {
    const { account, isWalletConnected } = useStoreState((state) => state.walletStore);

    return (
        <Navbar className={classes.Header} variant="light">
            <Container fluid>
                {isWalletConnected ?
                    <Navbar.Brand href="/"><Wallet /> Connected {trimAddress(account.address)}</Navbar.Brand>
                    : null}
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
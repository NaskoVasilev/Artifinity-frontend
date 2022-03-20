import { useStoreState } from 'easy-peasy';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CashStack, Coin, Kanban, PersonBoundingBox, Wallet } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import DisconnectWallet from '../../components/WalletConnection/DisconnectWallet/DisconnectWallet';

import classes from './Layout.module.scss';

const Layout = (props) => {
    const { isWalletConnected, account } = useStoreState((state) => state.walletStore);
    return (
        <Row className={classes.Page}>
            <Col xs='2' className={classes.Navigation}>
                <h2>Artifinity</h2>
                <hr />
                {isWalletConnected ?
                    <DisconnectWallet />
                    :
                    <NavLink to='/login' className={classes.Connect}>
                        <Wallet /> <span>Connect</span>
                    </NavLink>
                }
                <hr />
                <NavLink to='/'><CashStack /> <span>Dashboard</span></NavLink>
                {isWalletConnected && !account.token ?
                    <NavLink to='/register'><PersonBoundingBox /> <span>Become creator</span></NavLink>
                    : null}
                {isWalletConnected && account.token ?
                    <>
                        <NavLink to='/create'><Kanban /> <span>Create project</span></NavLink>
                        <NavLink to='/my/projects'><Coin /> <span>My projects</span></NavLink>
                    </>
                    : null}
            </Col>
            <Col>
                <Header />
                <div className={classes.Layout}>
                    {props.children}
                </div>
            </Col>
        </Row>
    );
}

export default Layout;
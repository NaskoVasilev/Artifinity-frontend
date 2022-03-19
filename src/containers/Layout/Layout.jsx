import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CashStack, Wallet } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';
import Header from '../../components/common/Header/Header';

import classes from './Layout.module.scss';

const Layout = (props) => {
    return (
        <Row className={classes.Page}>
            <Col xs='2' className={classes.Navigation}>
                <h2>Artifinity</h2>
                <hr />
                <NavLink to='/login' className={classes.Connect}><Wallet /> <span>Connect</span></NavLink>
                <hr />
                <NavLink to='/'><CashStack /> <span>Dashboard</span></NavLink>
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
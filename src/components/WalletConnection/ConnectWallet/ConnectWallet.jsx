import React from 'react';
import ConnectWalletButton from './Modal/Modal';
import classes from './ConnectWallet.module.scss';
import { Row, Col } from "react-bootstrap";

const ConnectWallet = (props) => {
    return (
        <div className={classes.Page}>
            <Row>
                <Col>
                    <div className={classes.ConnectBox}>
                        <div className={classes.Connection}>
                            {/* <div className={classes.Spinner}>
                                <Spinner />
                            </div> */}
                            <div className={classes.ConnectionText}>
                                <b>CURRENT STATUS:</b>
                                <p>WAITING FOR CONNECTION</p>
                            </div>
                        </div>
                        <ConnectWalletButton
                            connectWallet={props.connectWallet}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ConnectWallet;

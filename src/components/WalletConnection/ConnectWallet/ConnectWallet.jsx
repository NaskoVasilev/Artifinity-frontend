import React from 'react';
import ConnectWalletButton from './Modal/Modal';
import classes from './ConnectWallet.module.scss';

const ConnectWallet = (props) => {
    return (
        <div className={classes.Page}>
            <div className={classes.ConnectBox}>
                <div className={classes.Connection}>
                    <div className={classes.ConnectionText}>
                        <b>CURRENT STATUS:</b>
                        <p>WAITING FOR CONNECTION</p>
                    </div>
                </div>
                <ConnectWalletButton
                    connectWallet={props.connectWallet}
                />
            </div>
        </div>
    );
};

export default ConnectWallet;

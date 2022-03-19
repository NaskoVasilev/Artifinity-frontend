import React from 'react';
import classes from './ConnectWalletButton.module.scss';

const ConnectWalletButton = (props) => {
    return (
        <div onClick={props.onClick} className={classes.Box}>
            {props.icon}
            <h5>{props.name}</h5>
            <p>{props.text}</p>
        </div>
    );
}

export default ConnectWalletButton;
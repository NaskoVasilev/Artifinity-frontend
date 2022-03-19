import React from 'react';
import { useStore } from 'easy-peasy';

import classes from './DisconnectWallet.module.scss';
import { getWeb3Modal } from '../../../utils/web3Utils';
import { WALLET_CONNECT } from '../../../config/walletConnectConstants';
import Web3 from 'web3';

const web3modal = getWeb3Modal();

const DisconnectWallet = (props) => {
    const store = useStore();

    const disconnectClickedHandler = async () => {
        const web3 = new Web3(Web3.givenProvider);

        if (web3.eth.currentProvider.disconnect) {
            web3.eth.currentProvider.disconnect();
        }
        if (localStorage.getItem(WALLET_CONNECT)) {
            localStorage.removeItem(WALLET_CONNECT);
        }

        web3modal.clearCachedProvider();
        await store.getActions().optionStore.resetOptions();
        window.location.reload();
    };

    return (
        <button className={classes.Button} onClick={disconnectClickedHandler}>
            DISCONNECT
        </button>
    );
};

export default DisconnectWallet;

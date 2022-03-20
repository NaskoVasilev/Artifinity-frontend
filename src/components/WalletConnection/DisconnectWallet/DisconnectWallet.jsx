import React from 'react';

import classes from './DisconnectWallet.module.scss';
import Web3 from 'web3';
import { useStoreActions } from 'easy-peasy';
import { getWeb3Modal } from '../../../utils/web3Utils';
import { WALLET_CONNECT } from '../../../utils/config';

const DisconnectWallet = (props) => {
    const {
        setWalletConnection
    } = useStoreActions((actions) => actions.walletStore);

    const disconnectClickedHandler = async () => {
        const web3 = new Web3(Web3.givenProvider);

        if (web3.eth.currentProvider.disconnect) {
            web3.eth.currentProvider.disconnect();
        }
        if (localStorage.getItem(WALLET_CONNECT)) {
            localStorage.removeItem(WALLET_CONNECT);
        }

        const web3modal = await getWeb3Modal();
        web3modal.clearCachedProvider();

        setWalletConnection({
            isWalletConnected: false,
            account: null,
        })
    };

    return (
        <button className={classes.Button} onClick={disconnectClickedHandler}>
            Disconnect
        </button>
    );
};

export default DisconnectWallet;

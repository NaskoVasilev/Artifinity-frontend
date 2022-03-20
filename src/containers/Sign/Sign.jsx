import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useNavigate } from 'react-router';

import ConnectWallet from '../../components/WalletConnection/ConnectWallet/ConnectWallet';
import classes from './Sign.module.scss';

const Sign = () => {
    const { isWalletConnected } = useStoreState((state) => state.walletStore);

    const navigate = useNavigate()

    if (isWalletConnected) {
        navigate('/')
    }

    return (<ConnectWallet />)
}

export default Sign;
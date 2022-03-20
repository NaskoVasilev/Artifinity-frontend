import { useEffect, useState } from 'react';
import { getWeb3Modal } from '../../utils/web3Utils';

import detectEthereumProvider from '@metamask/detect-provider';
import { useStore, useStoreActions, useStoreState } from 'easy-peasy';

const { ethereum } = window;

export const MetamaskDaemon = () => {
    const {
        setWalletConnection,
        setWalletConnectionLoading,
        register
    } = useStoreActions((actions) => actions.walletStore);

    useEffect(() => {
        setWalletConnectionLoading(true);
        loadUser();
        // eslint-disable-next-line
    }, []);

    const loadUser = async () => {
        let provider = null;
        try {
            provider = await detectEthereumProvider();
        } catch (err) {
            setWalletConnectionLoading(false);
            return null;
        }

        if (!provider) {
            setWalletConnectionLoading(false);
            return null;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const modal = await getWeb3Modal();

        if (accounts[0]) {
            const isConnected =
                window?.ethereum?._state?.isConnected && modal?.cachedProvider;
            setWalletConnection({
                isWalletConnected: !!isConnected,
                account: { address: accounts[0] },
            });
            register(accounts[0]);

            return true;
        }

        return false;
    }

    return null;
};

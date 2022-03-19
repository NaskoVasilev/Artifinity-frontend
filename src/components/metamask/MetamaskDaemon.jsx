import { useEffect, useState } from 'react';
import { getWeb3Modal } from '../../utils/web3Utils';

import detectEthereumProvider from '@metamask/detect-provider';
import { useStore, useStoreActions, useStoreState } from 'easy-peasy';

const { ethereum } = window;

export const MetamaskDaemon = () => {
    const [web3Modal, setWeb3Modal] = useState();

    const { isWalletConnected } = useStoreState((state) => state.walletStore);
    const {
        setWalletConnection,
        setWalletConnectionLoading,
        register
    } = useStoreActions((actions) => actions.walletStore);
    const store = useStore();

    useEffect(() => {
        setWalletConnectionLoading(true);
        loadWeb3();
        // eslint-disable-next-line
    }, []);

    async function loadWeb3() {
        setWeb3Modal(await getWeb3Modal());

        const userLoaded = await loadUser();

        if (!userLoaded || !isWalletConnected) {
            await store.persist.clear();
        }
    }

    async function loadUser() {
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

        if (accounts[0]) {
            const isWalletConnected =
                window?.ethereum?._state?.isConnected && web3Modal?.cachedProvider;

            register(accounts[0]);
            setWalletConnection({
                isWalletConnected: !!isWalletConnected,
                account: { address: accounts[0] },
            });

            return true;
        }

        return false;
    }

    return null;
};

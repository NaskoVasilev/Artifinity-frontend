import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from "ethers";
import Web3Modal from 'web3modal';

export const getWeb3Modal = async () => {
    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
            },
        },
    });

    return web3Modal
};

export const trimAddress = (address) => {
    if (!address) {
        return '';
    }

    return address.substring(0, 7) + '...' + address.slice(address.length - 4);
};

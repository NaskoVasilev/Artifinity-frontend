import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
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

export const signMessage = async (message) => {
    const web3 = new Web3(Web3.givenProvider)
    const address = await web3.eth.getCoinbase()
    return new Promise((resolve, reject) =>
        web3.eth.personal.sign(web3.utils.fromUtf8(message), address, (err, signature) => {
            if (err) return reject(err);
            return resolve({ address, signature });
        })
    )
}


export const trimAddress = (address) => {
    if (!address) {
        return '';
    }

    return address.substring(0, 7) + '...' + address.slice(address.length - 4);
};

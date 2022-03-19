import React, { useEffect } from 'react';
import { useStoreRehydrated, useStoreActions } from 'easy-peasy';
import Web3 from 'web3';

import classes from './App.module.scss';
import Routes from './components/Routes';
import Layout from './containers/Layout/Layout';
import { MetamaskDaemon } from './components/metamask/MetamaskDaemon';
import { NETWORKS } from './utils/enums';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { setNetwork, setAccount } = useStoreActions(
    (actions) => actions.walletStore
  );

  const isRehydrated = useStoreRehydrated();

  useEffect(() => {
    const checkNetwork = () => {
      let currentNetwork = null;

      if (
        window.ethereum?.chainId &&
        process.env.REACT_APP_NETWORK_ID &&
        process.env.REACT_APP_NETWORK_ID !== window.ethereum?.chainId?.replace('0x', '')
      ) {
        let key = Object.keys(NETWORKS).filter(
          (key) => NETWORKS[key].networkId === process.env.REACT_APP_NETWORK_ID
        );
        currentNetwork = NETWORKS[key]?.name;
      }

      if (window.ethereum) {
        new Web3(Web3.givenProvider).eth.net.getNetworkType().then((res) => {
          setNetwork(res.charAt(0).toUpperCase() + res.slice(1));
          if (currentNetwork) {
            alert(
              'You are on ' +
              res.charAt(0).toUpperCase() +
              res.slice(1) +
              ' and you should switch to ' +
              currentNetwork
            );
          }
        });
      }
    };

    window.ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts) {
      window.ethereum.on('accountsChanged', (accounts) => {
        checkNetwork();
        setAccount(accounts[0]);
      });
      window.ethereum.on('chainChanged', (chainId) => checkNetwork());
    });
    const web3 = new Web3(Web3.givenProvider);

    if (document.readyState === 'complete') {
      checkNetwork();
    } else {
      window.addEventListener('load', checkNetwork);
      return () => {
        document.removeEventListener('load', checkNetwork);
      };
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.App}>
      <Layout>
        <Routes />
      </Layout>
      <MetamaskDaemon />
    </div>
  );
}

export default App;

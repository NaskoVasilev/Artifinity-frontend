import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import Web3 from 'web3';

import classes from './App.module.scss';
import Routes from './components/Routes';
import Layout from './containers/Layout/Layout';
import { MetamaskDaemon } from './components/metamask/MetamaskDaemon';
import { NETWORKS } from './utils/config';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { setNetwork, register } = useStoreActions(
    (actions) => actions.walletStore
  );

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
        register(accounts[0]);
      });
      window.ethereum.on('chainChanged', (chainId) => checkNetwork());
    });

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

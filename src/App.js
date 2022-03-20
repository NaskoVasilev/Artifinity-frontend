import React, { useEffect } from 'react';
import { useStoreActions, useStoreRehydrated } from 'easy-peasy';
import Web3 from 'web3';

import classes from './App.module.scss';
import Routes from './components/Routes';
import Layout from './containers/Layout/Layout';
import { MetamaskDaemon } from './components/metamask/MetamaskDaemon';
import { NETWORKS } from './utils/config';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './components/common/Spinner/Spinner';
import { toastHandler, TOAST_STATES } from './helpers/toast';

function App() {
  const isRehydrated = useStoreRehydrated();

  const { setNetwork, register, setAccount } = useStoreActions(
    (actions) => actions.walletStore
  );

  useEffect(() => {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts) {
      window.ethereum.on('accountsChanged', (accounts) => {
        checkNetwork();
        setAccount({ address: accounts[0] })
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

  const checkNetwork = () => {
    let currentNetwork = null;

    if (
      window.ethereum?.chainId &&
      process.env.REACT_APP_NETWORK_ID &&
      +process.env.REACT_APP_NETWORK_ID !== parseInt(window.ethereum?.chainId, 16)
    ) {
      let key = Object.keys(NETWORKS).filter(
        (key) => {
          return NETWORKS[key].networkId === process.env.REACT_APP_NETWORK_ID
        }
      );
      currentNetwork = NETWORKS[key]?.name;
    }

    if (window.ethereum) {
      new Web3(Web3.givenProvider).eth.net.getNetworkType().then((res) => {
        setNetwork(res.charAt(0).toUpperCase() + res.slice(1));
        if (currentNetwork) {
          toastHandler({
            success: TOAST_STATES.ERROR,
            message: `You are on ${res.charAt(0).toUpperCase() + res.slice(1)} network and you should switch to ${currentNetwork}`
          })
        }
      });
    }
  };

  if (!isRehydrated) {
    return <Spinner />
  };

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

import React, { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { isBrowser, isMobile } from 'react-device-detect';
import Web3 from 'web3';

import ConnectWalletButton from '../../../ConnectWalletButton/ConnectWalletButton';
import { ReactComponent as MetaMask } from '../../../../assets/icons/metamask.svg';
import { ReactComponent as WalletConnect } from '../../../../assets/icons/walletconnect.svg';
import { getWeb3Modal } from '../../../../utils/web3Utils';

import classes from './Modal.module.scss';
import { useStoreActions } from 'easy-peasy';

const ethereum = window?.ethereum;

const ConnectWalletModal = (props) => {
    const [show, setShow] = useState(false);
    const [web3modal, setWeb3modal] = useState();

    const { setWalletConnection, register } = useStoreActions(
        (actions) => actions.walletStore
    );

    // TODO: check this logic
    useEffect(() => {
        if (ethereum && ethereum.isMetaMask) {
            setData();
        } else {
            // setWalletConnection(false);
        }
        if (ethereum && isMobile && !isBrowser) {
            window.web3 = new Web3(Web3.givenProvider);
            window?.web3?.givenProvider?.enable();
            connectMetaMaskClickedHandler();
        }

        // eslint-disable-next-line
    }, []);

    const setData = async () => {
        const web3Modal = await getWeb3Modal()
        setWeb3modal(web3Modal);
        let isEnabled = false;
        if (ethereum?._state) {
            isEnabled = ethereum._state.isConnected;
        }
        if (isEnabled && web3Modal.cachedProvider) {
            connectMetaMaskClickedHandler(web3Modal);
        } else {
            // setWalletConnection(false);
        }
    };

    const clickedHandler = (e) => {
        setShow(!show);
    };

    const connectMetaMaskClickedHandler = (modal) => {
        if (ethereum) {
            (web3modal || modal).connect()
                .then(() => {
                    let selectedAddress = ethereum.selectedAddress
                        ? ethereum.selectedAddress
                        : ethereum.address;
                    register(selectedAddress);
                    setWalletConnection({
                        isWalletConnected: true,
                        account: { address: selectedAddress },
                    });
                })
                .catch((err) => {
                    console.log('CONNECT METAMASK FROM POP UP EXTENSION');
                });
        }
    };

    const clickedWalletConnect = async () => {
        const provider = new WalletConnectProvider({
            infuraId: process.env.REACT_APP_INFURA_ID
        });
        try {
            const accounts = await provider.enable();
            provider.connector.connect();
            if (ethereum && provider.connected) {
                await window?.web3?.setProvider(provider);
            }
            props.connectWallet(true, accounts[0]);
        } catch (err) {
            return;
        }
    };

    const buttonSize = () => {
        return classes.ConnectButton;
    };

    return (
        <>
            <button onClick={clickedHandler} className={buttonSize()}>
                CONNECT WALLET
            </button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Body>
                    <Row>
                        {window?.web3 || window?.ethereum ? (
                            <Col>
                                <ConnectWalletButton
                                    onClick={connectMetaMaskClickedHandler}
                                    icon={<MetaMask />}
                                    name="MetaMask"
                                    text="Connect to your MetaMask wallet"
                                />
                            </Col>
                        ) : null}
                        <Col>
                            <ConnectWalletButton
                                onClick={clickedWalletConnect}
                                icon={<WalletConnect />}
                                name="WalletConnect"
                                text="Scan with WalletConnect to connect"
                            />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ConnectWalletModal;

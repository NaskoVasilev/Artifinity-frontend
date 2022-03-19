import { action, thunk } from 'easy-peasy';

export const walletStore = {
    /**
     * STATE
     */
    isWalletConnected: false,
    loading: true,
    account: null,
    network: '',
    /**
     * ACTIONS
     */
    setWalletConnection: action((state, payload) => {
        state.isWalletConnected = payload.isWalletConnected;

        if (!payload.isWalletConnected) {
            state.account = null;
            state.loading = true;
            state.usdcBalance = '';
        } else {
            state.account = payload.account;
            state.loading = false;
        }
    }),
    setAccount: action((state, payload) => {
        state.account = payload;
    }),
    setWalletConnectionLoading: action((state, payload) => {
        state.loading = payload;
    }),
    setNetwork: action((state, payload) => {
        state.network = payload;
    }),
};

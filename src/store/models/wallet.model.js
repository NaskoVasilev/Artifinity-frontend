import { action, thunk } from 'easy-peasy';
import UserService from '../../services/userService';
import { signMessage } from '../../utils/web3Utils';

export const walletStore = {
    /**
     * STATE
     */
    isWalletConnected: false,
    loading: true,
    account: null,
    nonce: null,
    id: null,
    network: '',
    /**
     * ACTIONS
     */
    setWalletConnection: action((state, payload) => {
        state.isWalletConnected = payload.isWalletConnected;

        if (!payload.isWalletConnected) {
            state.account = null;
            state.loading = true;
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
    /**
    * THUNKS
    */
    register: thunk(async (actions, payload, { getState, getStoreActions }) => {
        if (!getState().isWalletConnected) {
            actions.setAccount({ address: payload })
        } else {
            const data = await UserService.getUserInfo(payload)
            console.log('data', data);
            if (data) {
                await getStoreActions().walletStore.login(data.nonce)
            }
        }
    }),
    login: thunk(async (actions, payload, { getState }) => {
        const signedResult = await signMessage(payload)
        const data = await UserService.login(signedResult)

        actions.setAccount({ ...getState().account, ...data })
    }),
};

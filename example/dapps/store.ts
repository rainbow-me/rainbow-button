import WalletConnect from '@walletconnect/client';
import { createStore } from 'redux';

const SET_CONNECTOR = 'SET_CONNECTOR';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_CHAIN_ID = 'SET_CHAIN_ID';

export const setConnector = (connector: WalletConnect | null) => ({
  type: SET_CONNECTOR,
  payload: connector,
});

export const setAccounts = (accounts: string[] | null) => ({
  type: SET_ACCOUNTS,
  payload: accounts,
});

export const setChainId = (chainId: string | null) => ({
  type: SET_CHAIN_ID,
  payload: chainId,
});

const INITIAL_STATE = {
  connector: undefined,
  accounts: undefined,
  chainId: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CONNECTOR:
      return { ...state, connector: action.payload };
    case SET_ACCOUNTS:
      return { ...state, accounts: action.payload };
    case SET_CHAIN_ID:
      return { ...state, chainId: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer);

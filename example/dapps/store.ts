import WalletConnectClient from '@walletconnect/client';
import { SessionTypes } from '@walletconnect/types';
import { createStore } from 'redux';

const SET_SESSION = 'SET_SESSION';
const SET_CLIENT = 'SET_CLIENT';

export const setClient = (client: WalletConnectClient) => ({
  payload: client,
  type: SET_CLIENT,
});

export const setSession = (sessions: SessionTypes.Settled | null) => ({
  payload: sessions,
  type: SET_SESSION,
});

export const setPairings = (pairings: string[]) => ({
  payload: pairings,
  type: SET_SESSION,
});

const INITIAL_STATE = {
  client: undefined,
  session: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, session: action.payload };
    case SET_CLIENT:
      return { ...state, client: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer);

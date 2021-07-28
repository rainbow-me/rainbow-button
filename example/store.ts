import WalletConnectClient from '@walletconnect/client';
import { SessionTypes } from '@walletconnect/types';
import { createStore } from 'redux'
import {
  clone,
} from 'lodash';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const SET_SESSION = 'SET_SESSION';
const SET_CLIENT = 'SET_CLIENT';


export const setClient = (client: WalletConnectClient) => ({
    type: SET_CLIENT,
    payload: client
  })

export const setSession = (sessions: SessionTypes.Settled | undefined) => ({
    type: SET_SESSION,
    payload: sessions
  })

export const setPairings = (pairings: string[]) => ({
    type: SET_SESSION,
    payload: pairings
  })

const INITIAL_STATE = {
  session: undefined,
  client: undefined
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

const persistConfig = {
  key: 'root',
  storage,
}

export const store = createStore(reducer) 

  
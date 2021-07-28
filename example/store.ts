import WalletConnectClient from '@walletconnect/client';
import { SessionTypes } from '@walletconnect/types';
import { createStore } from 'redux'

const SET_SESSION = 'SET_SESSION';
const SET_CLIENT = 'SET_CLIENT';


export const setClient = (client: WalletConnectClient) => ({
    type: SET_CLIENT,
    payload: client
  })

export const setSession = (sessions: SessionTypes.Settled | null) => ({
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
      console.log('CASE  SET_SESSION', action.payload, { ...state, session: action.payload })
      return { ...state, session: action.payload };
    case SET_CLIENT:
      console.log('CASE SET CLIENT', action.payload)
      return { ...state, client: action.payload };
    default:
      console.log('CASE  default', action.payload)
      return state;
  }
};

export const store = createStore(reducer) 

  
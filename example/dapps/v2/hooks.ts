import WalletConnectClient from '@walletconnect/client';
import { SessionTypes } from '@walletconnect/types';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  setClient as rawSetClient,
  setPairings as rawSetPairings,
  setSession as rawSetSession,
} from '../store';

const selector = createSelector(
  ({ session, client }) => ({ client, session }),
  ({ session, client }) => {
    return {
      accounts: session?.state?.accounts || [],
      chains: session?.permissions?.blockchain?.chains || [],
      client,
      pairings: session?.state?.pairings,
      session,
    };
  }
);

export default function useWalletConnectState() {
  const { client, session, pairings, accounts, chains } = useSelector(selector);

  const dispatch = useDispatch();

  const setSession = (session: SessionTypes.Settled | null) =>
    dispatch(rawSetSession(session));
  const setClient = (client: WalletConnectClient) =>
    dispatch(rawSetClient(client));
  const setPairings = (pairings: string[]) =>
    dispatch(rawSetPairings(pairings));
  return {
    accounts,
    chains,
    client,
    pairings,
    session,
    setClient,
    setPairings,
    setSession,
  };
}

import React, { HTMLAttributes } from 'react';
import ConnectButton from './components/ConnectButton';
import { ClientOptions, ClientTypes, SessionTypes } from '@walletconnect/types';
import WalletConnectClient from "@walletconnect/client";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  clientOptions: ClientOptions
  clientConnectParams: ClientTypes.ConnectParams,
  onClientInitialized: (client: WalletConnectClient) => void,
  onSessionStarted: (session: SessionTypes.Settled) => void,
}

/**
 * Go to rainbow app via deeplink
 */
export const goToRainbow = (): void => {
  window.location.href = 'https://rnbwapp.com/wc'
}

/**
 * Returns an array containing session topics, if any
 * 
 * @param client - WalletConnectClient
 * @returns - Session topics
 */
export const getClientPairings = (client: WalletConnectClient): string[] => {
  return client?.session?.topics || []
}

export default ({
  clientOptions,
  clientConnectParams,
  onClientInitialized,
  onSessionStarted,
}: Props) => {
  return <ConnectButton
    clientOptions={clientOptions}
    clientConnectParams={clientConnectParams}
    onClientInitialized={onClientInitialized}
    onSessionStarted={onSessionStarted}
  />
};


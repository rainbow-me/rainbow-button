import React, { HTMLAttributes } from 'react';
import ConnectButton from './components/ConnectButton';
import { AppMetadata, SessionTypes } from '@walletconnect/types';
import WalletConnectClient from "@walletconnect/client";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  chainId: string,
  relayProvider: string,
  metadata: AppMetadata,
  methods: string[],
  onClientInitialized: (client: WalletConnectClient) => void,
  onSessionStarted: (session: SessionTypes.Settled) => void
}

export const goToRainbow = () => {
  window.location.href = 'https://rnbwapp.com/wc'
}

export const getClientPairings = (client: WalletConnectClient): string[] => {
  return client?.session?.topics || []
}

export default ({ chainId,
  metadata,
  methods,
  onClientInitialized,
  onSessionStarted,
  relayProvider,
}: Props) => {
  return <ConnectButton
      chainId={chainId}
      metadata={metadata}
      methods={methods}
      onClientInitialized={onClientInitialized}
      onSessionStarted={onSessionStarted}
      relayProvider={relayProvider}
    />
  };


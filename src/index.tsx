import React, { FC, HTMLAttributes } from 'react';
import ConnectButton from './components/ConnectButton';
import { AppMetadata } from '@walletconnect/types';
import WalletConnectClient from "@walletconnect/client";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  chainId: string,
  relayProvider: string,
  metadata: AppMetadata,
  methods: string[],
  onClientInitialized: (client: WalletConnectClient) => void
}

export const RainbowButton: FC<Props> = ({  chainId,
  metadata,
  methods,
  onClientInitialized,
  relayProvider,
}) => {
  return <ConnectButton
      chainId={chainId}
      metadata={metadata}
      methods={methods}
      onClientInitialized={onClientInitialized}
      relayProvider={relayProvider}
    />
  };

import WalletConnectClient from '@walletconnect/client';
import { ClientOptions, ClientTypes, SessionTypes } from '@walletconnect/types';
import React from 'react';
import ConnectButton from './components/button/ConnectButton';
import {
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_MAIN_CHAINS_EIP155,
  SUPPORTED_TEST_CHAINS_EIP155,
} from './constants';
import {
  getAddressAndChainIdFromAccount,
  getClientPairings,
  goToRainbow,
} from './utils';

export interface ExperimentalProps {
  clientOptions: ClientOptions;
  clientConnectParams: ClientTypes.ConnectParams;
  onClientInitialized: (client: WalletConnectClient) => void;
  onSessionStarted: (session: SessionTypes.Settled) => void;
  customButton?: any;
  animate?: boolean;
}

export const RainbowButton = ({
  clientOptions,
  clientConnectParams,
  onClientInitialized,
  onSessionStarted,
  customButton,
  animate,
}: ExperimentalProps) => {
  return (
    <ConnectButton
      animate={animate}
      clientConnectParams={clientConnectParams}
      clientOptions={clientOptions}
      customButton={customButton}
      onClientInitialized={onClientInitialized}
      onSessionStarted={onSessionStarted}
    />
  );
};

export const utils = {
  getAddressAndChainIdFromAccount,
  getClientPairings,
  goToRainbow,
};

export const constants = {
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_MAIN_CHAINS_EIP155,
  SUPPORTED_TEST_CHAINS_EIP155,
};

import React from 'react';
import ConnectButton from './components/button/ConnectButton';
import WalletConnectClient from '@walletconnect/client';
import { ClientOptions, ClientTypes, SessionTypes } from '@walletconnect/types';
import {
  getClientPairings,
  goToRainbow,
  getAddressAndChainIdFromAccount,
} from './utils';
import {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAINS_EIP155,
  SUPPORTED_MAIN_CHAINS_EIP155,
} from './constants';

export interface ExperimentalProps {
  clientOptions: ClientOptions;
  clientConnectParams: ClientTypes.ConnectParams;
  onClientInitialized: (client: WalletConnectClient) => void;
  onSessionStarted: (session: SessionTypes.Settled) => void;
  customButton?: any;
  animate?: boolean;
}

export const RainbowButtonExperimental = ({
  clientOptions,
  clientConnectParams,
  onClientInitialized,
  onSessionStarted,
  customButton,
  animate,
}: ExperimentalProps) => {
  return (
    <ConnectButton
      clientOptions={clientOptions}
      clientConnectParams={clientConnectParams}
      onClientInitialized={onClientInitialized}
      onSessionStarted={onSessionStarted}
      customButton={customButton}
      animate={animate}
    />
  );
};

export const utils = {
  goToRainbow,
  getClientPairings,
  getAddressAndChainIdFromAccount,
};

export const constants = {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAINS_EIP155,
  SUPPORTED_MAIN_CHAINS_EIP155,
};

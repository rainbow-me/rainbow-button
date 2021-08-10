import React from 'react';
import ConnectButtonV2 from './components/button/ConnectButtonV2';
import ConnectButtonV1 from './components/button/ConnectButtonV1';
import WalletConnectClient from "@walletconnectv2/client";
import WalletConnect from "@walletconnect/client";
import { ClientOptions, ClientTypes, SessionTypes } from "@walletconnectv2/types";
import { IWalletConnectOptions } from '@walletconnect/types';
import { getClientPairings, goToRainbow, getAddressAndChainIdFromAccount } from './utils'
import {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAINS_EIP155,
  SUPPORTED_MAIN_CHAINS_EIP155,
} from './constants'

export interface ExperimentalProps {
  clientOptions: ClientOptions
  clientConnectParams: ClientTypes.ConnectParams,
  onClientInitialized: (client: WalletConnectClient) => void,
  onSessionStarted: (session: SessionTypes.Settled) => void,
}

export const RainbowButtonExperimental  = ({
  clientOptions,
  clientConnectParams,
  onClientInitialized,
  onSessionStarted,
}: ExperimentalProps) => {
  return <ConnectButtonV2
    clientOptions={clientOptions}
    clientConnectParams={clientConnectParams}
    onClientInitialized={onClientInitialized}
    onSessionStarted={onSessionStarted}
  />
};

export interface Props {
  chainId: number | undefined,
  connectorOptions: IWalletConnectOptions,
  onConnectorInitialized: (client: WalletConnect) => void,
}

export const RainbowButton = ({
  chainId,
  connectorOptions,
  onConnectorInitialized,
}: Props) => {
  return <ConnectButtonV1
    chainId={chainId}
    connectorOptions={connectorOptions}
    onConnectorInitialized={onConnectorInitialized}
  />
};

export const utils = { goToRainbow, getClientPairings, getAddressAndChainIdFromAccount }

export const constants = {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAINS_EIP155,
  SUPPORTED_MAIN_CHAINS_EIP155,
}


import React, { HTMLAttributes } from 'react';
import ConnectButtonV2 from './components/button/ConnectButtonV2';
import WalletConnectClient from "@walletconnectv2/client";
import { ClientOptions, ClientTypes, SessionTypes } from "@walletconnectv2/types";
import { getClientPairings, goToRainbow, getAddressAndChainIdFromAccount } from './utils'
import {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAINS_EIP155,
  SUPPORTED_MAIN_CHAINS_EIP155,
} from './constants'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  clientOptions: ClientOptions
  clientConnectParams: ClientTypes.ConnectParams,
  onClientInitialized: (client: WalletConnectClient) => void,
  onSessionStarted: (session: SessionTypes.Settled) => void,
}

export default ({
  clientOptions,
  clientConnectParams,
  onClientInitialized,
  onSessionStarted,
}: Props) => {
  return <ConnectButtonV2
    clientOptions={clientOptions}
    clientConnectParams={clientConnectParams}
    onClientInitialized={onClientInitialized}
    onSessionStarted={onSessionStarted}
  />
};

export const utils = { goToRainbow, getClientPairings, getAddressAndChainIdFromAccount }

export const constants = {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAINS_EIP155,
  SUPPORTED_MAIN_CHAINS_EIP155,
}


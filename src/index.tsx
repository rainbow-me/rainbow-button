import React from 'react';
import ConnectButtonV1 from './components/button/ConnectButtonV1';
import WalletConnect from '@walletconnect/client';

import { IWalletConnectOptions } from '@walletconnect/types';
import { goToRainbow } from './utils';
import {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
} from './constants';
import rainbow_icon from '../assets/images/rainbow-icon.png';
import rainbow from '../assets/images/rainbow.png';

export interface Props {
  chainId: number | undefined;
  connectorOptions: IWalletConnectOptions;
  onConnectorInitialized: (client: WalletConnect) => void;
  customButton?: any;
  animate?: boolean;
}

export const RainbowButton = ({
  chainId,
  connectorOptions,
  onConnectorInitialized,
  customButton,
  animate,
}: Props) => {
  return (
    <ConnectButtonV1
      chainId={chainId}
      connectorOptions={connectorOptions}
      onConnectorInitialized={onConnectorInitialized}
      customButton={customButton}
      animate={animate}
    />
  );
};

export const assets = {
  rainbow_icon: rainbow_icon,
  rainbow: rainbow,
};

export const utils = {
  goToRainbow,
};

export const constants = {
  SUPPORTED_TEST_CHAIN_IDS,
  SUPPORTED_MAIN_CHAIN_IDS,
};

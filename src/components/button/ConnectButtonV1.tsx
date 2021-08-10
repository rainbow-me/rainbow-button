import React, {  useEffect, useState } from 'react';
import ConnectButton from './ConnectButton';
import WalletConnect from "@walletconnect/client";
import { IWalletConnectOptions } from '@walletconnect/types';

function ConnectButtonV1({
    chainId,
    connectorOptions,
    onConnectorInitialized,
}: { 
    chainId: number | undefined,
    connectorOptions: IWalletConnectOptions,
    onConnectorInitialized: (client: WalletConnect) => void, 
}) {
    const [uri, setUri] = useState<string>('');
    useEffect(() => {
         const connector = new WalletConnect(connectorOptions);
         connector.createSession({chainId}).then(() => {
            setUri(connector.uri);
          });
          connector.on("connect", (error) => {
            if (error) {
              throw error;
            }
            onConnectorInitialized(connector);
          });
    }, []);

    return <ConnectButton uri={uri} />
}

export default React.memo(ConnectButtonV1);

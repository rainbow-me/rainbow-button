import React, {  useEffect, useState } from 'react';
import ConnectButton from './ConnectButton';
import WalletConnect from "@walletconnect/browser";
import { IWalletConnectOptions } from '@walletconnect/types';

function ConnectButtonV1({
    connectorOptions,
    onConnectorInitialized,
}: { 
    connectorOptions: IWalletConnectOptions,
    onConnectorInitialized: (client: WalletConnect) => void, 
}) {
    const [uri, setUri] = useState<string>('');

    useEffect(() => {
         const connector = new WalletConnect(connectorOptions);
         connector.createSession().then(() => {
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

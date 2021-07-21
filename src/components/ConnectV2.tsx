/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/clientv2";
import '../App.css';
import { constructDeeplink } from '../helpers/deeplink';
import { PairingTypes } from '@walletconnect/typesv2';

import rainbowOg from '../images/rainbow-og.png'

function ConectButtonV2({
    chainId,
    metadata,
    methods,
    onClientInitialized,
    relayProvider,
}: { chainId: string, relayProvider: string, metadata: object, methods: string[], onClientInitialized: (client: WalletConnectClient) => void }) {
    const [uri, setUri] = useState<string>();

    const connectToRainbow = useCallback(() => {
        if (!uri) return
        window.location.href = uri!
    }, [uri])

    useEffect(() => {
        const walletConnectInit = async () => {
            const client = await WalletConnectClient.init({
                relayProvider,
                metadata
            });
            client.on(
                CLIENT_EVENTS.pairing.proposal,
                async (proposal: PairingTypes.Proposal) => {
                    const { uri } = proposal.signal.params;
                    const deeplink = constructDeeplink(uri)
                    setUri(deeplink)
                },
            );
            onClientInitialized(client);
            await client.connect({
                permissions: {
                    blockchain: {
                        chains: [chainId],
                    },
                    jsonrpc: {
                        methods,
                    },
                },
            });

        }
        walletConnectInit()
    }, [chainId, metadata, methods, onClientInitialized, relayProvider]);
    return (
        <div className="App" >
            <a
                className="button"
                onClick={connectToRainbow}
                rel="noopener noreferrer"
            >
                <img height={25} src={'/rainbow-logo.png'} width={25} />
                {`Connect to Rainbow`}
            </a>
        </div>
    );
}

export default ConectButtonV2;

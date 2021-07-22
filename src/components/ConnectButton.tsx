/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import './../style.module.css';
import { constructDeeplink } from '../helpers/deeplink';
import { userAgentIsMobile } from '../helpers/userAgent';
import { PairingTypes, AppMetadata } from '@walletconnect/types';
import QRExpandedState from './QRExpandedState';

function ConnectButton({
    chainId,
    metadata,
    methods,
    onClientInitialized,
    relayProvider,
}: { chainId: string, relayProvider: string, metadata: AppMetadata, methods: string[], onClientInitialized: (client: WalletConnectClient) => void }) {
    const [uri, setUri] = useState<string>('');
    const [showQRCode, setShowQRCode] = useState<boolean>(false);

    const connectToRainbow = useCallback(() => {
        if (!uri) return
        if (userAgentIsMobile()) {
            window.location.href = uri!
        } else {
            setShowQRCode(true)
        }
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
            {showQRCode && <QRExpandedState setIsQRCodeOpen={setShowQRCode} value={uri} />}
            <a
                className="button"
                onClick={connectToRainbow}
                rel="noopener noreferrer"
            >
                {`Connect to Rainbow`}
            </a>
        </div>

    );
}

export default ConnectButton;

/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/clientv2";
import '../App.css';
import { constructDeeplink } from '../helpers/deeplink';


const SUPPORTED_MAIN_CHAINS_NAMES = {
    'eip155:1': "Mainnet",
    'eip155:10': "Optimism",
    'eip155:137': "Polygon",
    'eip155:42161': "Arbitrum",
};

function ConectButtonV2({
    chainId,
    relayProvider,
    metadata
}) {
    const [uri, setUri] = useState(null);
    const [client, setClient] = useState(null)

    const goToApp = useCallback(() => window.location.href = uri, [uri])

    const connectToRainbow = useCallback(async () => goToApp(), [goToApp]);

    useEffect(() => {
        if (!client) return
        client.on(
            CLIENT_EVENTS.pairing.proposal,
            async (proposal) => {
                const { uri } = proposal.signal.params;
                const deeplink = constructDeeplink(uri)
                setUri(deeplink)
            },
        );

        client.on(CLIENT_EVENTS.pairing.created, async (proposal) => {
            // if (typeof client === "undefined") return;
            // this.setState({ pairings: this.state.client.pairing.topics });
        });

        client.on(CLIENT_EVENTS.session.deleted, (session) => {
            // if (session.topic !== this.state.session?.topic) return;
            // console.log("EVENT", "session_deleted");
        });
    }, [client, goToApp])

    useEffect(() => {
        const walletConnectInit = async () => {
            const client = await WalletConnectClient.init({
                relayProvider,
                metadata
            });
            setClient(client);
            await client.connect({
                permissions: {
                    blockchain: {
                        chains: [chainId],
                    },
                    jsonrpc: {
                        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
                    },
                },
            });
        }
        walletConnectInit()
    }, [chainId, metadata, relayProvider]);

    return (
        <div className="App">
            <a
                className="button"
                onClick={connectToRainbow}
                rel="noopener noreferrer"
            >
                {`Connect to Rainbow on ${SUPPORTED_MAIN_CHAINS_NAMES[chainId]} 🌈`}
            </a>
        </div>
    );
}

export default ConectButtonV2;

/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/clientv2";
import './App.css';


const SUPPORTED_MAIN_CHAINS_NAMES = {
    'eip155:1': "Mainnet",
    'eip155:10': "Optimism",
    'eip155:137': "Polygon",
    'eip155:42161': "Arbitrum",
};

function ConectButtonV2({
    chainId = 'eip155:1'
}) {

    const [uri, setUri] = useState(null);
    const [client, setClient] = useState(null)
    const [session, setSession] = useState(null)

    const goToApp = useCallback(() => {
        const baseUrl = 'https://rnbwapp.com';
        console.log('window.location', window.location)
        window.location.href = uri;
    }, [uri])

    const connectToRainbow = useCallback(async () => {
        goToApp()

        console.log('session', session)
    }, [goToApp, session]);

    useEffect(() => {
        if (uri) {
            console.log('useEffect', uri)
            // goToApp()
        }
    }, [goToApp, uri])

    useEffect(() => {
        if (!client) return
        console.log('client set')
        client.on(
            CLIENT_EVENTS.pairing.proposal,
            async (proposal) => {
                const { uri } = proposal.signal.params;
                const baseUrl = 'https://rnbwapp.com';
                const encodedUri = encodeURIComponent(uri);
                const fullUrl = `${baseUrl}/wc?uri=${encodedUri}`;
                setUri(fullUrl)
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
                relayProvider: "wss://relay.walletconnect.org",
                metadata: {
                    name: "🌈 Rainbow Button",
                    description: "Rainbow Button",
                    url: 'https://rainbow.me',
                    icons: ['https://avatars2.githubusercontent.com/u/48327834?s=200&v=4'],
                },
            });
            setClient(client);
            const session = await client.connect({
                permissions: {
                    blockchain: {
                        chains: [chainId],
                    },
                    jsonrpc: {
                        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
                    },
                },
            });
            setSession(session)
        }
        walletConnectInit()
    }, [chainId]);

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

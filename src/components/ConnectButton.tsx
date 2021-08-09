/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import './../style.module.css';
import { constructDeeplink } from '../helpers/deeplink';
import { userAgentIsMobile } from '../helpers/userAgent';
import { PairingTypes, SessionTypes, ClientOptions, ClientTypes } from '@walletconnect/types';
import QRExpandedState from './QRExpandedState';
import styled, {keyframes} from 'styled-components';
import Fountain from './EmojiPop'
import { getClientPairings } from '../utils';

const animatedgradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`
const Content = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    height: 100%;
`

const Button = styled.a`
    transition: 0.125s ease;
    will-change: transform;
    padding: 4px 0px;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
		transform: scale(0.95) !important;
    }
`;

const ButtonInner = styled.div`
    -webkit-user-select: none;
    align-items: center;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    font-family: 'SFProRounded';
    font-size: 18px;
    font-weight: 700;
    height: 44px;
    letter-spacing: 0.5px;
    padding: 0 16px 2px 0;
    position: relative;
    text-align: center;
    transition: 0.125s ease;

    &:before {
		background: rgba(0, 0, 0, 1);
		border-radius: 16px;
		content: "";
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transition: 0.125s ease;
		width: 100%;
		will-change: transform;
		z-index: -1;

        -webkit-backdrop-filter: saturate(5);
		backdrop-filter: saturate(5);
		background: rgba(0, 0, 0, 0.85);
    }

    &:after {
		animation: ${animatedgradient} 80s ease-in-out alternate infinite;
		background: linear-gradient(270deg, #174299 0%, #1EDBAE 9.09%, #00B2FF 18.18%, #9F4CED 27.27%, #D04C74 36.36%, #00B5D5 45.45%, #174299 54.54%, #00B6CF 63.63%, #00D56F 72.72%, #174299 81.81%, #01BCD5 90.9%, #174299 100%);
		background-size: 1200% 1200%;
		border-radius: 18px;
		content: '';
		height: calc(100% + 4px);
		left: -2px;
		position: absolute;
		top: -2px;
		transition: 0.125s ease;
		width: calc(100% + 4px);
		z-index: -2;
    }
`;

const Logo = styled.img`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    border-radius: 11px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin-left: 6px;
    margin-right: 10px;
    margin-top: 2px;
`

const Label = styled.div`
    background: url(https://raw.githubusercontent.com/christianbaroni/rainbow-buttons/7186dbd3e6ba3e4b92e925fe97acfe21036d9f2b/1/button-label.svg) no-repeat;
    background-size: 100% 100%;
    height: 14px;
    opacity: 1;
    transition: 0.125s ease;
    width: 175px;
    will-change: transform;
`

function ConnectButton({
    clientOptions,
    clientConnectParams,
    onSessionStarted,
    onClientInitialized,
}: { 
    clientOptions: ClientOptions,
    clientConnectParams: ClientTypes.ConnectParams,
    onSessionStarted: (client: SessionTypes.Settled) => void, 
    onClientInitialized: (client: WalletConnectClient) => void, 
}) {
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
            const client = await WalletConnectClient.init(clientOptions);
            client.on(
                CLIENT_EVENTS.pairing.proposal,
                async (proposal: PairingTypes.Proposal) => {
                    const { uri } = proposal.signal.params;
                    console.log('uri', uri)
                    const deeplink = constructDeeplink(uri)
                    setUri(deeplink)
                },
            );
            onClientInitialized(client);
            if (!getClientPairings(client).length) {
                const session = await client.connect(clientConnectParams);
                onSessionStarted(session)
            }
        }
        walletConnectInit()
    }, []);

    useEffect(() => {
        new Fountain()
    }, [])

    return (
        <div >
            {showQRCode && <QRExpandedState setIsQRCodeOpen={setShowQRCode} value={uri} />}
            <Content id="content">
                <Button id="rainbow-button" onClick={connectToRainbow} >
                    <ButtonInner>
                        <Logo src="https://github.com/christianbaroni/rainbow-buttons/blob/main/1/rainbow-logo.png?raw=true" width="34" />
                        <Label id="rainbow-button-label" />
                    </ButtonInner>
                </Button>
            </Content>

        </div>

    );
}

export default React.memo(ConnectButton);

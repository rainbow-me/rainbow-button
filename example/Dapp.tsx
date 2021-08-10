import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as encUtils from "enc-utils";
import { useCallback, useState, useEffect, useMemo } from 'react';
import { supportedMainChainsInfo } from './constants'
import { CLIENT_EVENTS } from '@walletconnectv2/client';
import { PairingTypes, SessionTypes } from '@walletconnectv2/types';
import useWalletConnectState from './hooks';
import { formatTestTransaction } from './helpers/accounts';
import { eip712 } from './helpers/eip712'
import styled from 'styled-components';
import './App.css';
import RainbowButton, { utils, constants } from '../dist';

const {goToRainbow, getClientPairings} = utils;
const { SUPPORTED_MAIN_CHAINS_EIP155 } = constants;


const Button = styled.a`
  margin: 10px;
  padding: 10px;
  border-radius: 16px;
  color: #ffffff;
  background-color: blue;
  cursor: pointer;
  font-family: 'SFProRounded';
  font-size: 18px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
const getAddressAndChainIdFromWCAccount = (
  account: string
): { address: string; chainId: number } => {
  const [,chainId, address] = account.split(':');
  return { address, chainId: Number(chainId) };
};

const Dapp = () => {
  const { client, session, accounts, chains, setSession, setClient,setPairings} = useWalletConnectState()
  const [selectedChain, setSelectedChain] = useState('eip155:10')

  const selectChain = useCallback(chain => setSelectedChain(chain), [])
  const onSessionStarted = useCallback((session) => setSession(session), [])
  const onClientInitialized = useCallback(client => setClient(client), [])

  const subscribeToEvents = useCallback(() => {
    client?.on(CLIENT_EVENTS.pairing.created, async (proposal: PairingTypes.Settled) => {
      setPairings(client.pairing.topics)
    });
    client?.on(CLIENT_EVENTS.session.deleted, (session: SessionTypes.Settled) => {
      if (session.topic !== session?.topic) return;
      setSession(null)
      setPairings([])
    });
  }, [client])

  const checkPersistedState = useCallback(async () => {
    if (!session && getClientPairings(client).length) {
      const session = await client.session.get(getClientPairings(client)[0]);
      setSession(session)
    }
  }, [client, session])

  useEffect(() => {
    checkPersistedState()
    subscribeToEvents()
  }, [client, checkPersistedState, subscribeToEvents])

  const sendTransaction = useCallback(async () => {
    if (!client || !session) return
    try {
      // const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const account = accounts?.[0] || '';
      const tx = await formatTestTransaction(account);

      goToRainbow()
      const result = await client.request({
        topic: session.topic,
        chainId: chains?.[0] || '',
        request: {
          method: "eth_sendTransaction",
          params: [tx],
        },
      });
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [client, session]);

  const signPersonalMessage = useCallback(async () => {
    if (!client || !session) return
    try {
      const message = `Hello from Rainbow! `;
      const hexMsg = encUtils.utf8ToHex(message, true);
      const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const params = [hexMsg, address];

      // send message
      goToRainbow()
      const result = await client.request({
        topic: session.topic,
        chainId: chains?.[0] || '',
        request: {
          method: "personal_sign",
          params,
        },
      });
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [client, session]);

  const signTypedData = useCallback(async () => {
    if (!client || !session) return
    try {
      const message = JSON.stringify(eip712.example);
      const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const params = [address, message];

      // send message
      goToRainbow()
      const result = await client.request({
        topic: session.topic,
        chainId: chains?.[0] || '',
        request: {
          method: "eth_signTypedData",
          params,
        },
      });
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [client, session]);

  const isConnected = useMemo(() => {
    return Boolean(client) && Boolean(getClientPairings(client).length)
  }, [client])

  const renderNotConnected = useMemo(() => {
    return (
      <div>
        <p>Selected chain: {selectedChain}</p>
        <Wrapper>
          {
            Object.values(SUPPORTED_MAIN_CHAINS_EIP155).map((chain) => 
              <Button
                key={chain}
                color={supportedMainChainsInfo[chain].color}
                onClick={() => selectChain(chain)}>
                  {
                    supportedMainChainsInfo[chain].name
                  }
              </Button>)
          }
        </Wrapper>
        <RainbowButton
          clientOptions={{
            relayProvider: "wss://relay.walletconnect.org",
            metadata: {
              name: "🌈 Rainbow example dapp",
              description: "Rainbow example dapp",
              url: 'https://best.dapp',
              icons: ['https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/Evil-Toddler-Meme.jpg?fit=1500%2C1000&ssl=1'],
            }
          }}
          clientConnectParams={{
            permissions: {
                blockchain: {
                    chains: [selectedChain],
                },
                jsonrpc: {
                    methods: [
                      "eth_sendTransaction", "personal_sign", "eth_signTypedData"
                    ],
                },
            },
          }}
          onClientInitialized={onClientInitialized}
          onSessionStarted={onSessionStarted}
        />
      </div>

    )
  }, [selectedChain, onClientInitialized, onSessionStarted])

  const renderConnected = useMemo(() => {
    return (
      <div>
        <p>Connected to {supportedMainChainsInfo[chains?.[0] || '']?.name }</p>
        <p>Account: {getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address}</p>
        <Wrapper>
          <Button key={'sendTransaction'} onClick={sendTransaction}>{'sendTransaction'}</Button>
          <Button key={'signPersonalMessage'} onClick={signPersonalMessage}>{'signPersonalMessage'}</Button>
          <Button key={'signTypedData'} onClick={signTypedData}>{'signTypedData'}</Button>
        </Wrapper>
      </div>
    )
  }, [chains, accounts])

  return (
      <div>
        <h1 className="text-center">Rainbow example dapp</h1>
        {isConnected ? renderConnected : renderNotConnected}
      </div>

  );
};

export default Dapp

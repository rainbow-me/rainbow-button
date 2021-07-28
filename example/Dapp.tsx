import 'react-app-polyfill/ie11';
import * as React from 'react';
import { RainbowButton, goToRainbow } from '../dist';
import {SUPPORTED_MAIN_CHAINS, supportedMainChainsInfo, SUPPORTED_METHODS} from './constants'
import './App.css';
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client';
import { PairingTypes, SessionTypes } from '@walletconnect/types';
import useWalletConnectState from './hooks';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { formatTestTransaction } from './helpers/accounts';
import * as encUtils from "enc-utils";
import {eip712} from './helpers/eip712'

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
const fromEIP55Format = (chain: string) => chain?.replace('eip155:', '');

const getAddressAndChainIdFromWCAccount = (
  account: string
): { address: string; chainId: number } => {
  const [address, eip155Network] = account.split('@');
  const chainId = fromEIP55Format(eip155Network);
  return { address, chainId: Number(chainId) };
};

const App = () => {
  const [selectedChain, setSelectedChain] = useState('eip155:10')

  const { client, session, accounts, pairings, chains, setSession, setClient,setPairings} = useWalletConnectState()

  const selectChain = useCallback(chain => setSelectedChain(chain), [])

  const onSessionStarted = useCallback((session) => {
    setSession(session)
  }, [])

  const onClientInitialized = useCallback(client => setClient(client), [])

  const subscribeToEvents = useCallback(() => {
    if (!client) return
    client.on(CLIENT_EVENTS.pairing.created, async (proposal: PairingTypes.Settled) => {
      setPairings(client.pairing.topics)
    });

    client.on(CLIENT_EVENTS.session.deleted, (session: SessionTypes.Settled) => {
      if (session.topic !== session?.topic) return;
      setSession(undefined)
      setPairings([])
    });
  }, [client])

  const checkPersistedState = useCallback(async () => {
    if (!client) return
    if (session) return;
    if (client?.session?.topics?.length) {
      const session = await client.session.get(client.session.topics[0]);
      setSession(session)
    }
  }, [client, session])


  useEffect(() => {
    console.log('useEffect')
    checkPersistedState()
    subscribeToEvents()

  }, [client,checkPersistedState, subscribeToEvents])

  const renderConnection = useMemo(() => {
    return (
      <div>
      <p>Selected chain: {selectedChain}</p>
      <Wrapper>
        {
          SUPPORTED_MAIN_CHAINS.map((chain) => {
            return <Button key={chain} color={supportedMainChainsInfo[chain].color} onClick={() => selectChain(chain)}>{supportedMainChainsInfo[chain].name}</Button>
          })
        }
        </Wrapper>
        <RainbowButton 
          chainId={selectedChain}
          relayProvider={"wss://relay.walletconnect.org"}
          metadata={{
            name: "🌈 Best Dapp",
            description: "Best dapp in the world",
            url: 'https://best.dapp',
            icons: ['https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/Evil-Toddler-Meme.jpg?fit=1500%2C1000&ssl=1'],
          }}
          methods={[
            "eth_sendTransaction", "personal_sign", "eth_signTypedData"
          ]}
          onClientInitialized={onClientInitialized}
          onSessionStarted={onSessionStarted}
        />
      </div>

    )
  }, [selectedChain, onClientInitialized, onSessionStarted])

  const renderNotConnected = useMemo(() => {
    return (
      <div>
        <p>Connected to {supportedMainChainsInfo[chains?.[0] || '']?.name }</p>
        <p>Account: {getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address}</p>
        <Wrapper>
        {<Button key={'sendTransaction'} onClick={()=>sendTransaction()}>{'sendTransaction'}</Button>}
        {<Button key={'signPersonalMessage'} onClick={()=>signPersonalMessage()}>{'signPersonalMessage'}</Button>}
        {<Button key={'signTypedData'} onClick={()=>signTypedData()}>{'signTypedData'}</Button>}
        </Wrapper>
      </div>
    )
  }, [chains, accounts])


  const sendTransaction = async () => {
    if (!client) return
    if (!session) return

    try {
      const address =getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const account = accounts?.[0] || '';

      const tx = await formatTestTransaction(account);
      console.log('sending request')
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

      // format displayed result
      const formattedResult = {
        method: "eth_sendTransaction",
        address,
        valid: true,
        result,
      };

      console.log('formattedResult', formattedResult)

    } catch (error) {
      console.error(error);
    }
  };

  const signPersonalMessage = async () => {
    if (!client) return
    if (!session) return

    try {
      // test message
      const message = `Hello from Rainbow! `;

      // encode message (hex)
      const hexMsg = encUtils.utf8ToHex(message, true);

      const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const account = accounts?.[0] || '';

      // personal_sign params
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
  };

  const signTypedData = async () => {
    if (!client) return
    if (!session) return

    try {
      // test message
      const message = JSON.stringify(eip712.example);

      const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const account = accounts?.[0] || '';

      // eth_signTypedData params
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
  };

  return (
      <div>
        <h1 className="text-center">Rainbow example dapp</h1>

        {client?.session?.topics?.length && renderNotConnected}
        {!client?.session?.topics?.length && renderConnection}
      </div>

  );
};

export default App

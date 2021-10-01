import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as encUtils from 'enc-utils';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { supportedMainChainsInfoEip155 } from '../constants';
import { CLIENT_EVENTS } from '@walletconnect/client';
import { PairingTypes, SessionTypes } from '@walletconnect/types';
import useWalletConnectState from './hooks';
import { formatTestTransaction, renderAddress } from '../helpers/accounts';
import { eip712 } from '../helpers/eip712';
import { RainbowButton, utils, constants } from '../../../dist';
import { ActionButton, Button, Wrapper } from '../../styled';
import { isMobile } from '@walletconnect/browser-utils';

const { goToRainbow, getClientPairings } = utils;
const { SUPPORTED_MAIN_CHAINS_EIP155 } = constants;

const getAddressAndChainIdFromWCAccount = (
  account: string
): { address: string; chainId: number } => {
  const [, chainId, address] = account.split(':');
  return { address, chainId: Number(chainId) };
};

const images = {
  /* eslint-disable import/no-commonjs */
  arbitrum: require('../../assets/images/arbitrum.png'),
  ethereum: require('../../assets/images/ethereum.png'),
  optimism: require('../../assets/images/optimism.png'),
  polygon: require('../../assets/images/polygon.png'),
  /* eslint-enable import/no-commonjs */
};

const Dapp = () => {
  const {
    client,
    session,
    accounts,
    chains,
    setSession,
    setClient,
    setPairings,
  } = useWalletConnectState();
  const [selectedChain, setSelectedChain] = useState('');

  const selectChain = useCallback(chain => setSelectedChain(chain), []);
  const onSessionStarted = useCallback(session => setSession(session), [
    setSession,
  ]);
  const onClientInitialized = useCallback(client => setClient(client), [
    setClient,
  ]);

  const subscribeToEvents = useCallback(() => {
    client?.on(
      CLIENT_EVENTS.pairing.created,
      async (proposal: PairingTypes.Settled) => {
        setPairings(client.pairing.topics);
      }
    );
    client?.on(
      CLIENT_EVENTS.session.deleted,
      (session: SessionTypes.Settled) => {
        if (session.topic !== session?.topic) return;
        setSession(null);
        setPairings([]);
      }
    );
  }, [client, setPairings, setSession]);

  const checkPersistedState = useCallback(async () => {
    if (!session && getClientPairings(client).length) {
      const session = await client.session.get(getClientPairings(client)[0]);
      setSession(session);
    }
  }, [client, session, setSession]);

  useEffect(() => {
    checkPersistedState();
    subscribeToEvents();
  }, [client, checkPersistedState, subscribeToEvents]);

  const sendTransaction = useCallback(async () => {
    if (!client || !session) return;
    try {
      // const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
      const account = accounts?.[0] || '';
      const tx = await formatTestTransaction(account);

      isMobile() && goToRainbow();
      const result = await client.request({
        topic: session.topic,
        chainId: chains?.[0] || '',
        request: {
          method: 'eth_sendTransaction',
          params: [tx],
        },
      });
      console.log('RESULT', result);
    } catch (error) {
      console.error(error);
    }
  }, [accounts, chains, client, session]);

  const signPersonalMessage = useCallback(async () => {
    if (!client || !session) return;
    try {
      const message = `Hello from Rainbow! `;
      const hexMsg = encUtils.utf8ToHex(message, true);
      const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '')
        .address;
      const params = [hexMsg, address];

      // send message
      isMobile() && goToRainbow();
      const result = await client.request({
        topic: session.topic,
        chainId: chains?.[0] || '',
        request: {
          method: 'personal_sign',
          params,
        },
      });
      console.log('RESULT', result);
    } catch (error) {
      console.error(error);
    }
  }, [accounts, chains, client, session]);

  const signTypedData = useCallback(async () => {
    if (!client || !session) return;
    try {
      const message = JSON.stringify(eip712.example);
      const address = getAddressAndChainIdFromWCAccount(accounts?.[0] || '')
        .address;
      const params = [address, message];

      // send message
      isMobile() && goToRainbow();
      const result = await client.request({
        topic: session.topic,
        chainId: chains?.[0] || '',
        request: {
          method: 'eth_signTypedData',
          params,
        },
      });
      console.log('RESULT', result);
    } catch (error) {
      console.error(error);
    }
  }, [accounts, chains, client, session]);

  const isConnected = useMemo(() => {
    return Boolean(client) && Boolean(getClientPairings(client).length);
  }, [client]);

  const disconnect = useCallback(async () => {
    const reason = {
      code: 400,
      message: 'User disconnected',
    };
    client.disconnect({ reason, topic: session.topic });
  }, [client, session]);

  const renderNotConnected = useMemo(() => {
    return (
      <div>
        <p className="text-center">
          {'Trying RainbowButton experimental (Wallet Connect v2)'}
        </p>
        <p className="text-center">
          {selectedChain
            ? `Selected chain: ${selectedChain}`
            : `Select chain to use the button`}
        </p>
        {!selectedChain && (
          <Wrapper>
            {Object.values(SUPPORTED_MAIN_CHAINS_EIP155).map(chain => (
              <Button
                key={chain}
                color={supportedMainChainsInfoEip155[chain].color}
                onClick={() => selectChain(chain)}
              >
                <img
                  alt="network-icon"
                  className={`network-icon ${supportedMainChainsInfoEip155[chain]?.value}`}
                  src={images[supportedMainChainsInfoEip155[chain]?.value]}
                />
                {supportedMainChainsInfoEip155[chain].name}
              </Button>
            ))}
          </Wrapper>
        )}

        <Wrapper>
          {selectedChain && (
            <RainbowButton
              clientOptions={{
                relayProvider: 'wss://relay.walletconnect.org',
                metadata: {
                  name: '🌈 Rainbow example dapp',
                  description: 'Rainbow example dapp',
                  url: 'https://best.dapp',
                  icons: [
                    'https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/Evil-Toddler-Meme.jpg?fit=1500%2C1000&ssl=1',
                  ],
                },
              }}
              clientConnectParams={{
                permissions: {
                  blockchain: {
                    chains: [selectedChain],
                  },
                  jsonrpc: {
                    methods: [
                      'eth_sendTransaction',
                      'personal_sign',
                      'eth_signTypedData',
                    ],
                  },
                },
              }}
              onClientInitialized={onClientInitialized}
              onSessionStarted={onSessionStarted}
            />
          )}
        </Wrapper>
      </div>
    );
  }, [selectedChain, onClientInitialized, onSessionStarted, selectChain]);
  console.log('client', client);
  console.log('session', session);

  const renderConnected = useMemo(() => {
    return (
      <div>
        <p>{chains}</p>
        <Wrapper>
          <p className="text-center">
            Connected to{' '}
            {supportedMainChainsInfoEip155[chains?.[0] || '']?.name}
          </p>
        </Wrapper>
        <Wrapper>
          <p className="text-center">
            Account:{' '}
            {renderAddress(
              getAddressAndChainIdFromWCAccount(accounts?.[0] || '').address
            )}
          </p>
        </Wrapper>
        <Wrapper>
          <ActionButton key={'sendTransaction'} onClick={sendTransaction}>
            {'sendTransaction'}
          </ActionButton>
          <ActionButton
            key={'signPersonalMessage'}
            onClick={signPersonalMessage}
          >
            {'signPersonalMessage'}
          </ActionButton>
          <ActionButton key={'signTypedData'} onClick={signTypedData}>
            {'signTypedData'}
          </ActionButton>
        </Wrapper>

        <Wrapper>
          <ActionButton key={'disconnect'} onClick={disconnect}>
            {'Disconnect'}
          </ActionButton>
        </Wrapper>
      </div>
    );
  }, [
    chains,
    accounts,
    sendTransaction,
    signPersonalMessage,
    signTypedData,
    disconnect,
  ]);

  return <div>{isConnected ? renderConnected : renderNotConnected}</div>;
};

export default Dapp;

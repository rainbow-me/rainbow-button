import 'react-app-polyfill/ie11';
import { isMobile } from '@walletconnect/browser-utils';
import { CLIENT_EVENTS } from '@walletconnect/client';
import { SessionTypes } from '@walletconnect/types';
import * as encUtils from 'enc-utils';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { constants, RainbowButton, utils } from '../../../dist';
import { ActionButton, Button, Wrapper } from '../../styled';
import { supportedMainChainsInfoEip155 } from '../constants';
import { formatTestTransaction, renderAddress } from '../helpers/accounts';
import { eip712 } from '../helpers/eip712';
import useWalletConnectState from './hooks';

const { goToRainbow, getClientPairings } = utils;
const { SUPPORTED_MAIN_CHAINS_EIP155 } = constants;

const getAddressAndChainIdFromWCAccount = (
  account: string
): { address: string; chainId: number } => {
  const [, chainId, address] = account.split(':');
  return { address: address || '', chainId: Number(chainId) || -1 };
};

const toEIP55Format = (chainId: string | number) => `eip155:${chainId}`;

const images = {
  /* eslint-disable import/no-commonjs */
  arbitrum: require('../../assets/images/arbitrum.png'),
  ethereum: require('../../assets/images/ethereum.png'),
  optimism: require('../../assets/images/optimism.png'),
  polygon: require('../../assets/images/polygon.png'),
  /* eslint-enable import/no-commonjs */
};

const Dapp = () => {
  const { client, session, accounts, setSession, setClient, setPairings } =
    useWalletConnectState();

  const [selectedChain, setSelectedChain] = useState('');

  const currentSession = useMemo(
    () => getAddressAndChainIdFromWCAccount(accounts?.[0] || ''),
    [accounts]
  );

  const selectChain = useCallback((chain) => setSelectedChain(chain), []);

  const onSessionStarted = useCallback(
    (session) => setSession(session),
    [setSession]
  );
  const onClientInitialized = useCallback(
    (client) => setClient(client),
    [setClient]
  );

  const subscribeToEvents = useCallback(() => {
    client?.on(CLIENT_EVENTS.pairing.created, async () => {
      setPairings(client.pairing.topics);
    });
    client?.on(
      CLIENT_EVENTS.session.deleted,
      (session: SessionTypes.Settled) => {
        if (session.topic !== session?.topic) return;
        setSession(null);
        setPairings([]);
      }
    );
    client?.on(
      CLIENT_EVENTS.session.updated,
      (session: SessionTypes.Settled) => {
        if (session.topic !== session?.topic) return;
        setSession(session);
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
      await client.request({
        chainId: toEIP55Format(currentSession.chainId),
        request: {
          method: 'eth_sendTransaction',
          params: [tx],
        },
        topic: session.topic,
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, [accounts, client, currentSession.chainId, session]);

  const signPersonalMessage = useCallback(async () => {
    if (!client || !session) return;
    try {
      const message = `Hello from Rainbow! `;
      const hexMsg = encUtils.utf8ToHex(message, true);
      const address = currentSession.address;
      const params = [hexMsg, address];

      // send message
      isMobile() && goToRainbow();
      await client.request({
        chainId: toEIP55Format(currentSession.chainId),
        request: {
          method: 'personal_sign',
          params,
        },
        topic: session.topic,
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, [client, currentSession.address, currentSession.chainId, session]);

  const signTypedData = useCallback(async () => {
    if (!client || !session) return;
    try {
      const message = JSON.stringify(eip712.example);
      const address = currentSession.address;
      const params = [address, message];

      // send message
      isMobile() && goToRainbow();
      await client.request({
        chainId: toEIP55Format(currentSession.chainId),
        request: {
          method: 'eth_signTypedData',
          params,
        },
        topic: session.topic,
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, [client, currentSession.address, currentSession.chainId, session]);

  const isConnected = useMemo(() => {
    console.log('client', client);
    return (
      Boolean(client) &&
      Boolean(getClientPairings(client).length) &&
      Boolean(currentSession.address)
    );
  }, [client, currentSession.address]);

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
        <p className="text-center">Trying Rainbow Button</p>
        <p className="text-center">
          {selectedChain
            ? `Selected chain: ${selectedChain}`
            : `Select chain to use the button`}
        </p>
        {!selectedChain && (
          <Wrapper>
            {Object.values(SUPPORTED_MAIN_CHAINS_EIP155).map((chain) => (
              <Button
                color={supportedMainChainsInfoEip155[chain].color}
                key={chain}
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
              clientOptions={{
                metadata: {
                  description: 'Rainbow Button Dapp',
                  icons: [
                    'https://raw.githubusercontent.com/rainbow-me/rainbow-button/master/assets/images/rainbow-og.png',
                  ],
                  name: '🌈 Rainbow Button Dapp',
                  url: 'https://rainbow-me.github.io/rainbow-button/',
                },
                projectId: '35b6d81a08d1d098a6a0be761f00eea0',
              }}
              onClientInitialized={onClientInitialized}
              onSessionStarted={onSessionStarted}
            />
          )}
        </Wrapper>
      </div>
    );
  }, [selectedChain, onClientInitialized, onSessionStarted, selectChain]);

  const renderConnected = useMemo(() => {
    return (
      <div>
        <Wrapper>
          <p className="text-center">
            Connected to{' '}
            {
              supportedMainChainsInfoEip155[
                toEIP55Format(currentSession.chainId)
              ]?.name
            }
          </p>
        </Wrapper>
        <Wrapper>
          <p className="text-center">
            Account: {renderAddress(currentSession.address)}
          </p>
        </Wrapper>
        <Wrapper>
          <ActionButton key="sendTransaction" onClick={sendTransaction}>
            sendTransaction
          </ActionButton>
          <ActionButton key="signPersonalMessage" onClick={signPersonalMessage}>
            signPersonalMessage
          </ActionButton>
          <ActionButton key="signTypedData" onClick={signTypedData}>
            signTypedData
          </ActionButton>
        </Wrapper>

        <Wrapper>
          <ActionButton key="disconnect" onClick={disconnect}>
            Disconnect
          </ActionButton>
        </Wrapper>
      </div>
    );
  }, [
    currentSession.chainId,
    currentSession.address,
    sendTransaction,
    signPersonalMessage,
    signTypedData,
    disconnect,
  ]);

  return <div>{isConnected ? renderConnected : renderNotConnected}</div>;
};

export default Dapp;

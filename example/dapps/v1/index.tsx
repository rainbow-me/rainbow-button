import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as encUtils from "enc-utils";
import { useCallback, useState, useEffect, useMemo } from 'react';
import { supportedMainChainsInfo } from '../constants'
import useWalletConnectState from '../v1/hooks';
import { formatTestTransaction } from '../helpers/accounts';
import { eip712 } from '../helpers/eip712'
import { RainbowButton, utils, constants } from '../../../dist';
import { Button, Wrapper } from '../../styled';
import { userAgentIsMobile } from '../helpers/userAgent';

const isMobile = userAgentIsMobile()

const {goToRainbow} = utils;
const { SUPPORTED_MAIN_CHAIN_IDS } = constants;


const Dapp = () => {
  const { connector, accounts, chainId, setConnector} = useWalletConnectState()
  const [selectedChain, setSelectedChain] = useState('')

  const selectChain = useCallback(chain => setSelectedChain(chain), [])
  const onConnectorInitialized = useCallback(connector => {
    console.log('setting connectr', connector)
    setConnector(connector)}
    , [])

  const subscribeToEvents = useCallback(() => {
    if (!connector) return 
    console.log('subscribeToEvents', connector)
    // Check if connection is already established
    if (connector && !connector.connected) {
      // create new session
      // connector.createSession();
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      // const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0];

    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
      setConnector(null)
    });
  }, [connector])

  // const checkPersistedState = useCallback(async () => {
  //   if (!connector && getClientPairings(client).length) {
  //     const session = await client.session.get(getClientPairings(client)[0]);
  //     setSession(session)
  //   }
  // }, [connector])

  useEffect(() => {
    // checkPersistedState()
    subscribeToEvents()
  }, [subscribeToEvents])

  const sendTransaction = useCallback(async () => {
    if (!connector) return
    try {
      const tx = await formatTestTransaction(accounts?.[0]);

      isMobile && goToRainbow()
      const result = await connector.sendTransaction(tx)
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const signPersonalMessage = useCallback(async () => {
    if (!connector) return
    try {
      const message = `Hello from Rainbow! `;
      const hexMsg = encUtils.utf8ToHex(message, true);
      const address = accounts?.[0]
      const params = [hexMsg, address];

      // send message
      isMobile && goToRainbow()
      const result = await connector.signPersonalMessage(params)

      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const signTypedData = useCallback(async () => {
    if (!connector) return
    try {
      const message = JSON.stringify(eip712.example);
      const address = accounts?.[0]
      const params = [address, message];

      // send message
      isMobile && goToRainbow()
      const result = await connector.signTypedData(params)
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);
  console.log('connectors', connector)
  const isConnected = useMemo(() => {
    return Boolean(connector) && accounts?.length
  }, [connector, accounts])
  console.log('passing Number(selectedChain)', Number(selectedChain))
  const renderNotConnected = useMemo(() => {
    return (
      <div>
        <p className="text-center">{'Trying RainbowButton (with Wallet Connect v1)'}</p>
        <p className="text-center">{selectedChain ? `Selected chain: ${selectedChain}` : `Select chain to use the button`}</p>
        {!selectedChain && <Wrapper>
          {
            Object.values(SUPPORTED_MAIN_CHAIN_IDS).map((chain) => 
            supportedMainChainsInfo[chain]?.name && <Button
                key={chain}
                onClick={() => selectChain(chain)}>
                  {
                    supportedMainChainsInfo[chain]?.name
                  }
              </Button>)
          }
        </Wrapper>}

        {selectedChain && <RainbowButton
          chainId={Number(selectedChain)}
          connectorOptions={{
            bridge: "https://bridge.walletconnect.org",
            clientMeta: {
              name: "🌈 Rainbow example dapp",
              description: "Rainbow example dapp",
              url: 'https://best.dapp',
              icons: ['https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/Evil-Toddler-Meme.jpg?fit=1500%2C1000&ssl=1'],
            }
          }}
          onConnectorInitialized={onConnectorInitialized}
        />}
      </div>

    )
  }, [selectedChain, onConnectorInitialized])

  const renderConnected = useMemo(() => {
    return (
      <div>
        <p className="text-center">Connected to {supportedMainChainsInfo[chainId]?.name }</p>
        <p className="text-center">Account: {accounts?.[0]}</p>
        <Wrapper>
          <Button key={'sendTransaction'} onClick={sendTransaction}>{'sendTransaction'}</Button>
          <Button key={'signPersonalMessage'} onClick={signPersonalMessage}>{'signPersonalMessage'}</Button>
          <Button key={'signTypedData'} onClick={signTypedData}>{'signTypedData'}</Button>
        </Wrapper>
      </div>
    )
  }, [chainId, accounts])

  return (
      <div>
        {isConnected ? renderConnected : renderNotConnected}
      </div>

  );
};

export default Dapp

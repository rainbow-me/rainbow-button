import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as encUtils from "enc-utils";
import { useCallback, useState, useEffect, useMemo } from 'react';
import { supportedMainChainsInfo } from '../constants'
import useWalletConnectState from '../v1/hooks';
import { formatTestTransaction, renderAddress } from '../helpers/accounts';
import { eip712 } from '../helpers/eip712'
import { RainbowButton, utils, constants } from '../../../dist';
import { Button, ActionButton, Wrapper } from '../../styled';
import { isMobile } from '@walletconnect/browser-utils';

const {goToRainbow} = utils;
const { SUPPORTED_MAIN_CHAIN_IDS } = constants;

const images = {
  arbitrum: require("../../assets/images/arbitrum.png"),
  ethereum: require("../../assets/images/ethereum.png"),
  optimism: require("../../assets/images/optimism.png"),
  polygon: require("../../assets/images/polygon.png")
}

const Dapp = () => {
  const { connector, accounts, chainId, setConnector} = useWalletConnectState()
  const [selectedChain, setSelectedChain] = useState('')

  const selectChain = useCallback(chain => setSelectedChain(chain), [])
  const onConnectorInitialized = useCallback(connector => {
    console.log('onConnectorInitialized')
    setConnector(connector)}
    , [])

  const subscribeToEvents = useCallback(() => {
    if (!connector) return 
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

      isMobile() && goToRainbow()
      const result = await connector.sendTransaction(tx)
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const disconnect = useCallback(async () => connector?.killSession(), [connector])

  const signPersonalMessage = useCallback(async () => {
    if (!connector) return
    try {
      const message = `Hello from Rainbow! `;
      const hexMsg = encUtils.utf8ToHex(message, true);
      const address = accounts?.[0]
      const params = [hexMsg, address];

      // send message
      isMobile() && goToRainbow()
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
      isMobile() && goToRainbow()
      const result = await connector.signTypedData(params)
      console.log('RESULT', result)
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const isConnected = useMemo(() => {
    return Boolean(connector) && accounts?.length
  }, [connector, accounts])

  const renderNotConnected = useMemo(() => {
    return (
      <div>
        <p className="text-center">{selectedChain ? `Selected chain id: ${selectedChain}` : `Select chain to use with the button`}</p>
        {!selectedChain && <Wrapper>
          {
            Object.values(SUPPORTED_MAIN_CHAIN_IDS).map((chain) => 
            supportedMainChainsInfo[chain]?.name && <Button
                key={chain}
                onClick={() => selectChain(chain)}>
                  <img
                    src={images[supportedMainChainsInfo[chain]?.value]}
                    className={`network-icon ${supportedMainChainsInfo[chain]?.value}`}
                  />
                  {
                    supportedMainChainsInfo[chain]?.name
                  }
              </Button>)
          }
        </Wrapper>}
        <Wrapper>
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
          // customButton={<Button />}
        />}
        </Wrapper>
      </div>

    )
  }, [selectedChain, onConnectorInitialized])

  const renderConnected = useMemo(() => {
    return (
      <div>
        <Wrapper>
        <p className="text-center">Connected to {supportedMainChainsInfo[chainId]?.name }</p>
        <p className="text-center">Account: {renderAddress(accounts?.[0])}</p>
        </Wrapper>
        <Wrapper>
          <ActionButton key={'sendTransaction'} onClick={sendTransaction}>{'sendTransaction'}</ActionButton>
          <ActionButton key={'signPersonalMessage'} onClick={signPersonalMessage}>{'signPersonalMessage'}</ActionButton>
          <ActionButton key={'signTypedData'} onClick={signTypedData}>{'signTypedData'}</ActionButton>
          </Wrapper>
        <Wrapper>
          <ActionButton key={'disconnect'} onClick={disconnect}>{'disconnect'}</ActionButton>
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

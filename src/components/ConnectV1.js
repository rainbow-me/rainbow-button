/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import WalletConnect from "@walletconnect/browser";
import './App.css';

function ConectButtonV1() {

  const [uri, setUri] = useState('');
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connector, setConnector] = useState(null);

  useEffect(() => {

    // Create a connector
    const _connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org" // Required
    });

    setConnector(_connector);
  }, []);

  useEffect(() => {
    if (!connector) return;
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession().then(() => {
        console.log('uri created', connector.uri);
        setUri(connector.uri);
      });
    } else {
      setAccount(connector._accounts[0]);
      setChainId(connector._chainId);
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccount(accounts[0]);
      setChainId(chainId);
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccount(accounts[0]);
      setChainId(chainId);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Delete connector
      setConnector(null);
      setAccount(null);
      setChainId(null);
    });
  }, [connector]);

  const connectToRainbow = useCallback(() => {
    const baseUrl = 'https://rnbwapp.com';
    const encodedUri = encodeURIComponent(uri);
    const fullUrl = `${baseUrl}/wc?uri=${encodedUri}`;
    console.log('full url', fullUrl);
    window.location.href = baseUrl;
  }, [uri]);

  const disconnectFromRainbow = useCallback(() => {
    connector.killSession();
  }, [connector]);

  return (
    <div className="App">
      <header className="App-header">
        {account ? (
          <Fragment>
            <p>Connected to chainId {chainId} <br />
              Account: {account.substr(0, 4)}...{account.substr(-4,)}</p>
            <a
              className="App-link"
              onClick={disconnectFromRainbow}
              rel="noopener noreferrer"
            >
              Disconnect
            </a>
          </Fragment>
        ) : (
          <a
            className="App-link"
            onClick={connectToRainbow}
            rel="noopener noreferrer"
          >
            Connect to Rainbow 🌈
          </a>)}
      </header>
    </div>
  );
}

export default ConectButtonV1;

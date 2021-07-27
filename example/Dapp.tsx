import 'react-app-polyfill/ie11';
import * as React from 'react';
import { RainbowButton } from '../dist';
import {SUPPORTED_MAIN_CHAINS, supportedMainChainsInfo} from './constants/chains'
import './App.css';
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client';
import { PairingTypes, SessionTypes } from '@walletconnect/types';

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

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const App = () => {
  const [selectedChain, setSelectedChain] = useState('eip155:1')
  const [client, setClient] = useState<WalletConnectClient>()
  const [pairings, setPairings] = useState<string[]>()
  const [accounts, setAccounts] = useState<string[]>()
  const [chains, setChains] = useState<string[]>()
  const [session, setSession] = useState<SessionTypes.Settled>()

  const chooseChain = useCallback(chain => setSelectedChain(chain), [])

  const subscribeToEvents = () => {
    if (!client) return

    client.on(CLIENT_EVENTS.pairing.created, async (proposal: PairingTypes.Settled) => {
      setPairings(client.pairing.topics)
    });

    client.on(CLIENT_EVENTS.session.deleted, (session: SessionTypes.Settled) => {
      if (session.topic !== session?.topic) return;
      console.log("EVENT", "session_deleted");
      // this.resetApp();
    });
  };

  const checkPersistedState = async () => {
    if (!client) throw new Error("WalletConnect is not initialized");
    setPairings(client.pairing.topics)

    if (typeof session !== "undefined") return;
    // populates existing session to state (assume only the top one)
    if (client.session.topics.length) {
      const session = await client.session.get(client.session.topics[0]);
      const chains = session.state.accounts.map(account => account.split("@")[1]);
      setAccounts(session.state.accounts)
      setChains(chains)
      // this.onSessionConnected(session);
    }
  };

  const onSessionStarted = useCallback((session) => {
    console.log('setSession', session)
    setSession(session)
  }, [client])


  const onClientInitialized = useCallback(client => setClient(client), [])

  console.log('client ', client)
  console.log('session state', session?.state)
  console.log('session permissions', session?.permissions?.blockchain?.chains)
  return (
      <div>
        <h1 className="text-center">Rainbow example dapp</h1>

        <Wrapper>
        {
          SUPPORTED_MAIN_CHAINS.map((chain) => {
            return <Button key={chain} color={supportedMainChainsInfo[chain].color} onClick={() => chooseChain(chain)}>{supportedMainChainsInfo[chain].name}</Button>
          })
        }
        </Wrapper>
        <p>Connected chain: {session?.permissions?.blockchain?.chains[0]}</p>
        <p>Account: {session?.state?.accounts[0]}</p>
        <Wrapper>
        <p>Selected chain: {selectedChain}</p>
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

  );
};

export default App

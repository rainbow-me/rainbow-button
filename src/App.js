/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ConnectV2 from './components/ConnectV2.tsx'
import './App.css';
import { SUPPORTED_MAIN_CHAINS } from './utils/chainsConstants';



function App() {
  return (
    <div className="App">
      <ConnectV2
        chainId={SUPPORTED_MAIN_CHAINS.OPTIMISM}
        relayProvider={"wss://relay.walletconnect.org"}
        metadata={{
          name: "🌈 Rainbow Button",
          description: "Rainbow Button",
          url: 'https://rainbow.me',
          icons: ['https://avatars2.githubusercontent.com/u/48327834?s=200&v=4'],
        }}
        methods={[
          "eth_sendTransaction", "personal_sign", "eth_signTypedData"
        ]}
        onClientInitialized={() => console.log('Client initialized!')}
      />
    </div>
  );
}

export default App;

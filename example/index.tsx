import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RainbowButton } from '../.';
import './App.css';

const App = () => {
  return (
      <div>
        <h1 className="text-center">Best dapp in the world</h1>
      <RainbowButton chainId={'eip155:10'}
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
};

ReactDOM.render(<App />, document.getElementById('root'));

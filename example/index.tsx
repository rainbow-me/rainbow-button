import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RainbowButton } from '../.';
import './App.css';

const App = () => {
  return (
      <div>
        <h1 className="text-center">Best dapp in the universe</h1>
      <RainbowButton chainId={'eip155:10'}
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
        onClientInitialized={() => console.log('Client initialized!')}
      />
      </div>

  );
};

ReactDOM.render(<App />, document.getElementById('root'));

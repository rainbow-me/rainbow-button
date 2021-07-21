/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ConnectV1 from './ConnectV1'
import ConnectV2 from './ConnectV2'
import './App.css';

const SUPPORTED_MAIN_CHAINS = [
  'eip155:1',
  'eip155:10',
  'eip155:137',
  'eip155:42161',
];


function App() {
  return (
    <div className="App">
      <ConnectV2 chainId={SUPPORTED_MAIN_CHAINS[1]} />
    </div>
  );
}

export default App;

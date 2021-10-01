import 'react-app-polyfill/ie11';
import * as React from 'react';
import './App.css';
import DappV2 from './dapps/v2';

const Dapp = () => {
  return (
    <div className={'body'}>
      <h1 className="text-center">Rainbow Button Dapp</h1>
      <DappV2 />
    </div>
  );
};

export default Dapp;

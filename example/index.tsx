import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import Dapp from './Dapp'

const App = () => <Dapp />

ReactDOM.render(<App />, document.getElementById('root'));

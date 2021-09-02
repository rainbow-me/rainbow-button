import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import Dapp from './Dapp';
import { Provider } from 'react-redux';
import { store } from './dapps/store';

const App = () => <Dapp />;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

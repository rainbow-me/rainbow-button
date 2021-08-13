# Rainbow Button 🌈

Rainbow Button is a react component that renders an opinionated button built on top of (WalletConnect)[https://walletconnect.org/] v1 which allows you to connect to (Rainbow)[https://rainbow.me/] on mobile (via Mobile Deeplinking) and desktop (via QR codes) and maybe add a recordit gif showing a quick demo

## Demo Dapp

[Demo Link](https://rainbow-me.github.io/rainbow-button)

## Install

```

yarn add @rainbow/rainbow-button

```

## How to use

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { RainbowButton } from '@rainbow/rainbow-button';

ReactDOM.render(
  <RainbowButton
    chainId={1}
    connectorOptions={{ bridge: 'https://bridge.walletconnect.org' }}
    onConnectorInitialized={(connector) => console.log(connector)}
  />,
  document.getElementById('rainbowButton')
);
```

## Rainbow button without styling or custom button

```js
ReactDOM.render(
  <RainbowButton
    chainId={1}
    connectorOptions={{ bridge: 'https://bridge.walletconnect.org' }}
    onConnectorInitialized={(connector) => console.log(connector)}
    render={() => <button>Custom Rainbow button</button>}
  />,
  document.getElementById('rainbowButton')
);
```

## RainbowButton Props

| params                 | value    | default value | description                                                                        |
| ---------------------- | -------- | ------------- | ---------------------------------------------------------------------------------- |
| chainId                | number   | REQUIRED      | Rainbow supported chainId                                                          |
| connectorOptions       | object   | REQUIRED      | _Wallet Connect_ `connector` options. `bridge` param is required                   |
| onConnectorInitialized | function | REQUIRED      | Will be called when the button is instantiated, will return the `connector` object |
| render                 | function | -             | Render prop to use a custom element                                                |
| animate                | boolean  | true          | Whether or not animate the button                                                  |

## onConnectorInitialized callback

This callback will return a `WalletConnect` connector object, you should store it and use it as a normal `WalletConnect` client object.

## Initiate connection and listen to events

```js
const onConnectorInitialized = useCallback(
  (connector) => {
    setConnector(connector);
  },
  [setConnector]
);

// Subscribe to connection events and update your app accordingly

const subscribeToEvents = useCallback(() => {
  connector.on('connect', (error, payload) => {
    if (error) {
      throw error;
    }
    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  connector.on('session_update', (error, payload) => {
    if (error) {
      throw error;
    }
    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  connector.on('disconnect', (error, payload) => {
    if (error) {
      throw error;
    }
    // Delete connector
    setConnector(null);
  });
}, [connector]);
```

More details can be found in the Wallet Connect docs:

- [Wallet Connect client](https://docs.walletconnect.org/quick-start/dapps/client)

## Dev Server

```
yarn start
```

To run and try the example dapp locally open other terminal and run

```
cd example
yarn start
```

Default dev server runs at localhost:1234 in browser.

## Production Bundle

```
yarn bundle
```

import 'react-app-polyfill/ie11';
import * as React from 'react';
import './App.css';
import { useState, useMemo } from 'react';
import DappV1 from './dapps/v1'
import DappV2 from './dapps/v2'
import { Button, Wrapper } from './styled';

const Dapp = () => {
  const [version, setVersion] = useState('')

  const renderDapp = useMemo(() => {
    if (version === 'v1') return <DappV1 /> 
    return <DappV2 /> 
  }, [version])

  return (
      <div>
        <h1 className="text-center">Rainbow example dapp</h1>
        {version && renderDapp }
        {!version && (
          <div>
          <h2 className="text-center">Choose a RainbowButton</h2>
            <Wrapper>
                  <Button key={'v1'} onClick={() => setVersion('v1')}>{'RainbowButton'}</Button>
                  <Button key={'v2'} onClick={() => setVersion('v2')}>{'RainbowButtonExperimental'}</Button>
            </Wrapper>
          </div>
        )}
      </div>

  );
};

export default Dapp

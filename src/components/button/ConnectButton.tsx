import React, { useCallback, useEffect, useState } from 'react';
import QRExpandedState from '../QRExpandedState';
import Fountain from '../EmojiPop';
import { Button, ButtonInner, Content, Logo } from '../../styled';
import { constructDeeplink } from '../../helpers/deeplink';
import { isMobile } from '@walletconnect/browser-utils';
import ButtonLabel from '../../icons/ButtonLabel';

const rainbow_logo = require('./public/images/rainbow-logo.png');

function ConnectButton({
  uri,
  customButton,
  animate = true,
}: {
  uri: string;
  customButton?: any;
  animate?: boolean;
}) {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const connectToRainbow = useCallback(() => {
    if (!uri) return;
    if (isMobile()) {
      window.location.href = constructDeeplink(uri)!;
    } else {
      setShowQRCode(true);
    }
  }, [uri]);

  useEffect(() => {
    animate && new Fountain();
  }, [animate]);

  return (
    <div>
      <QRExpandedState
        enabled={showQRCode}
        setIsQRCodeOpen={setShowQRCode}
        value={uri}
      />
      {customButton ? (
        <div id="content" onClick={connectToRainbow}>
          <div id="rainbow-button">{customButton}</div>
        </div>
      ) : (
        <Content id="content">
          <Button id="rainbow-button" onClick={connectToRainbow}>
            <ButtonInner>
              <Logo src={rainbow_logo} width="34" />
              <ButtonLabel />
            </ButtonInner>
          </Button>
        </Content>
      )}
    </div>
  );
}

export default React.memo(ConnectButton);

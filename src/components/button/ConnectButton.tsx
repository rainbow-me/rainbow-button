import React, { useCallback, useEffect, useState } from 'react';
import { userAgentIsMobile } from '../../helpers/userAgent';
import QRExpandedState from '../QRExpandedState';
import Fountain from '../EmojiPop'
import { Button, ButtonInner, Content, Label, Logo } from '../../styled';
import { constructDeeplink } from '../../helpers/deeplink';

const rainbow_logo = require('./public/images/rainbow-logo.png')

function ConnectButton({ uri }: { uri: string }) {
    const [showQRCode, setShowQRCode] = useState<boolean>(false);

    const connectToRainbow = useCallback(() => {

        if (!uri) return
        if (userAgentIsMobile()) {
            window.location.href = constructDeeplink(uri)!
        } else {
            setShowQRCode(true)
        }
    }, [uri])

    useEffect(() => {
        new Fountain()
    }, [])

    return (
        <div >
            <QRExpandedState enabled={showQRCode} setIsQRCodeOpen={setShowQRCode} value={uri} />
            <Content id="content">
                <Button id="rainbow-button" onClick={connectToRainbow}>
                    <ButtonInner>
                        <Logo src={rainbow_logo} width="34" />
                        <Label id="rainbow-button-label" />
                    </ButtonInner>
                </Button>
            </Content>
        </div>
    );
}

export default React.memo(ConnectButton);

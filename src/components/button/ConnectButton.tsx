import React, { useCallback, useEffect, useState } from 'react';
import { userAgentIsMobile } from '../../helpers/userAgent';
import QRExpandedState from '../QRExpandedState';
import Fountain from '../EmojiPop'
import { Button, ButtonInner, Content, Label, Logo } from '../../styled';

function ConnectButton({ uri }: { uri: string }) {
    const [showQRCode, setShowQRCode] = useState<boolean>(false);

    const connectToRainbow = useCallback(() => {
        if (!uri) return
        if (userAgentIsMobile()) {
            window.location.href = uri!
        } else {
            setShowQRCode(true)
        }
    }, [uri])

    useEffect(() => {
        new Fountain()
    }, [])

    return (
        <div >
            {showQRCode && <QRExpandedState setIsQRCodeOpen={setShowQRCode} value={uri} />}
            <Content id="content">
                <Button id="rainbow-button" onClick={connectToRainbow} >
                    <ButtonInner>
                        <Logo src="https://github.com/christianbaroni/rainbow-buttons/blob/main/1/rainbow-logo.png?raw=true" width="34" />
                        <Label id="rainbow-button-label" />
                    </ButtonInner>
                </Button>
            </Content>

        </div>

    );
}

export default React.memo(ConnectButton);

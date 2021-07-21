import React from 'react';
import styled from 'styled-components';
import QRCode from './QRCode';

const Content = styled.div<{ showQR?: boolean }>`
  border-radius: 39px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
  height: 200px;
  margin-top: 30px;
  opacity: ${({ showQR }) => (showQR ? 1 : 0)};
  padding: 8px;
  transition: 0.225s ease;
  width: 200px;
`;

const QRCard = ({ value, showQR, size }: { value: string, showQR: boolean, size?: number }) => {
    return (
        <Content showQR={showQR}>
            <QRCode size={size} value={value} />
        </Content>
    );
};

export default QRCard;
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const XButtonWrapper = styled.div`
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    height: 27px;
    opacity: 1;
    overflow: visible;
    padding: 30px;
    pointer-events: 'auto';
    position: fixed;
    top: 0;
    right: 0;
    width: 27px;
    transition: 0.125s ease;
    z-index: 100;
    svg {
      will-change: transform;
    }
    :hover {
      transform: scale(1.125);
    }
    :active {
      transform: scale(0.875);
    }
    @media (max-width: 1200px) {
      padding: 19px 24px 15px;
      position: fixed;
      right: 0;
      top: 0;
    }
  `;

export const UniqueTokenExpandedStateContent = styled.div`
  display: none;
  align-items: center;
  align-self: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: 0.2s ease;
  width: 100%;
  will-change: transform;
  z-index: 40;
  animation: fadeIn 0.3s linear;
  @media (max-width: 850px) {
    overflow: visible;
    overflow-y: scroll;
    overflow-x: clip;
  }
  > div {
    height: 100%;
  }
`;

export const ExpandedState = styled(motion.div) <{ qr?: boolean }>`
  align-items: center;
  align-self: center;
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  margin: 0 42px;
  pointer-events: none;
  width: 1000px;
  @media (max-width: 850px) {
    box-sizing: border-box;
    flex-direction: column;
    margin: 0;
    max-width: 460px;
    padding: 0 30px;
    width: 100%;
  }
  @media (max-width: 650px) {
    max-width: 448px;
    padding: 0 24px;
  }
  @media (max-width: 375px) {
    height: 90%;
    width: 90%;
  }
`;


export const ExpandedStateBackground = styled.div<{
  isPopoverVisible?: boolean;
  popover?: boolean;
  opacity?: number;
}>`
    background-color: #000000;
    cursor: ${({ isPopoverVisible, popover }) =>
    popover && isPopoverVisible
      ? 'auto'
      : 'default'};
    ${({ theme: { isMobile } }) => !isMobile && 'left: -50vh;'}
    opacity: ${({ isPopoverVisible, opacity, popover }) =>
    opacity || (popover && isPopoverVisible ? 0.1 : 0)};
    pointer-events: ${({ isPopoverVisible, popover }) =>
    popover && !isPopoverVisible ? 'none' : 'auto'};
    position: fixed;
    top: 0;
    transition: 0.125s ease;
    width: ${({ theme: { isMobile } }) => (isMobile ? '100%' : '250vw')};
    height: 100%;
    z-index: -100;
  `;



  export const Column = styled.div<{
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
    width: ${({ width }) => width ?? '100%'};
    display: flex;
    flex-direction: column !important;
    padding: 0;
    align-items: ${({ align }) => align ?? 'center'};
    justify-content: ${({ justify }) => justify ?? 'flex-start'};
    padding: ${({ padding }) => padding};
    border: ${({ border }) => border};
    border-radius: ${({ borderRadius }) => borderRadius};
  `;

  export const Container = styled.div`
  background: white;
  border-radius: 53px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  margin-bottom: 150px;
  padding: 24px;
  transform: translate3d(0, 0, 0);
  transition: 0.125s ease;
  will-change: transform;

  :active {
    transform: scale(1.025) translate3d(0, 0, 0);
  }
`;

export const TitleText = styled.div<{ subtitle?: boolean }>`
  color: white;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: ${({ subtitle }) => (subtitle ? 0 : '24px')};
  text-align: center;
`;

export const DownloadContainer = styled.div`
  align-items: center;
  align-self: flex-end;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 0;
  margin: 0 auto 41px;
  position: absolute;
  right: 0;
  z-index: 100;
`;

export const DownloadButton = styled.a`
  background: #000000;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
  border-radius: 38px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  height: 46px;
  margin: 19px 7.5px;
  padding: 10px 19px 0;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  transition: 0.125s ease;
  will-change: transform;
  text-decoration: none;
  z-index: 100;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`;

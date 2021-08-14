import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

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

export const ExpandedState = styled(motion.div)<{ qr?: boolean }>`
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
    popover && isPopoverVisible ? 'auto' : 'default'};
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
  border-radius: 47px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  margin-bottom: 150px;
  padding: 30px;
  padding-bottom: 36px;
  transform: translate3d(0, 0, 0);
  transition: 0.125s ease;
  will-change: transform;
  z-index: 20;

  :active {
    transform: scale(1.025) translate3d(0, 0, 0);
  }
  
  @media (max-height: 750px) {
    margin-bottom: 130px;
  }
  
  @media (max-height: 680px) {
    margin-bottom: 24px;
  }
`;

export const TitleText = styled.div<{ subtitle?: boolean }>`
  color: white;
  letter-spacing: 0.35px;
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
  margin: 0 auto 42px;
  position: absolute;
  right: 0;
  z-index: 100;
  
  @media (max-height: 750px) {
    margin: 0 auto 24px;
  }
  
  @media (max-height: 680px) {
    display: none;
  }
`;

export const DownloadButton = styled.a`
  background: #000000;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
  border-radius: 47px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  height: 46px;
  margin: 19px 7.5px;
  padding: 10px 19px 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.35px;
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

export const animatedgradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  overflow: hidden;
  height: 100%;
  padding: 4px;
  transition: 0.125s ease;
  will-change: transform;

  :hover {
    transform: scale(1.05);
  }

  :active {
    transform: scale(0.95) !important;
  }
`;

export const Button = styled.a`
  transition: 0.125s ease;
  will-change: transform;
`;

export const ButtonInner = styled.div`
  -webkit-user-select: none;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: 'SFProRounded';
  font-size: 18px;
  font-weight: 700;
  height: 44px;
  letter-spacing: 0.5px;
  padding: 0 16px 2px 0;
  position: relative;
  text-align: center;
  transition: 0.125s ease;
  
  :hover {
    &:before {
      backdrop-filter: saturate(4);
      background: rgba(0, 0, 0, 0.925);
    }
  }

  &:before {
    backdrop-filter: saturate(4);
    background: rgba(0, 0, 0, 0.85);
    border-radius: 16px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: 0.125s ease;
    width: 100%;
    will-change: transform;
    z-index: -1;
  }

  &:after {
    animation: ${animatedgradient} 80s ease-in-out alternate infinite;
    background: linear-gradient(
      270deg,
      #174299 0%,
      #1edbae 9.09%,
      #00b2ff 18.18%,
      #9f4ced 27.27%,
      #d04c74 36.36%,
      #00b5d5 45.45%,
      #174299 54.54%,
      #00b6cf 63.63%,
      #00d56f 72.72%,
      #174299 81.81%,
      #01bcd5 90.9%,
      #174299 100%
    );
    background-size: 1200% 1200%;
    border-radius: 18px;
    content: '';
    height: calc(100% + 4px);
    left: -2px;
    position: absolute;
    top: -2px;
    transition: 0.125s ease;
    width: calc(100% + 4px);
    will-change: transform;
    z-index: -2;
  }
  
  @media (color-gamut: p3) {
    :hover {
      &:before {
        background: color(display-p3 0 0 0 / 92.5%);
      }
    }

    &:before {
      background: color(display-p3 0 0 0 / 85%); 
    }

    &:after {
      background: linear-gradient(315deg, color(display-p3 0.09020 0.25882 0.6) 0%, color(display-p3 0.11765 0.85882 0.68235) 9.09%, color(display-p3 0 0.69804 1) 18.18%, color(display-p3 0.62353 0.29804 0.92941) 27.27%, color(display-p3 0.81569 0.29804 0.65098) 36.36%, color(display-p3 0 0.70980 0.83529) 45.45%, color(display-p3 0.09020 0.25882 0.6) 54.54%, color(display-p3 0 0.71373 0.81176) 63.63%, color(display-p3 0 0.83529 0.43529) 72.72%, color(display-p3 0.0902 0.25882 0.6) 81.81%, color(display-p3 0.00392 0.73725 0.83529) 90.9%, color(display-p3 0.09020 0.25882 0.6) 100%);
      background-size: 1200% 1200%;
    }
  }
`;

export const Logo = styled.img`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  border-radius: 11px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  margin-left: 6px;
  margin-right: 10px;
  margin-top: 2px;
`;

export const Label = styled.div`
  background-size: 100% 100%;
  height: 14px;
  opacity: 1;
  transition: 0.125s ease;
  width: 175px;
  will-change: transform;
`;

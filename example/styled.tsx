import styled from 'styled-components'

export const Button = styled.a`
    -webkit-tap-highlight-color: transparent;
    -webkit-box-align: center;
    align-items: center;
    background: rgb(255, 255, 255);
    border-radius: 15px;
    box-shadow: rgb(37 41 46 / 10%) 0px 4px 12px;
    box-sizing: content-box;
    color: rgba(60, 66, 82, 0.8);
    cursor: pointer;
    display: flex;
    height: 28px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 0px 16px 2px 2px;
    font-size: 16px;
    font-weight: 800;
    transition: all 0.125s ease 0s;
    user-select: none;
    will-change: transform;

    :hover {
        transform: scale(1.125);
      }
      :active {
        transform: scale(0.875);
      }
 
`

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    right: -200px;
`
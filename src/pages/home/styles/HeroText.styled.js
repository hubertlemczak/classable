import styled, { keyframes } from 'styled-components';
import { ReactComponent as downArrow } from '../../../assets/angle-down.svg';

export const HeroText = styled.div`
  background-color: black;
  color: white;
  max-width: 40rem;

  h2 {
    font-size: 3rem;
    padding-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    max-width: 18rem;
    line-height: 1.5;
    padding-bottom: 50px;
  }

  a {
    font-weight: bold;
    color: white;
    cursor: pointer;
    padding: 20px 30px;
    border-radius: 100px;
    border: none;
    background-color: #2bc48a;

    &:hover {
      background-color: #12db8e;
    }
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  height: 500px;
  align-items: center;
  position: relative;
`;

const upDown = keyframes`
    from {
      transform: translate(50%, 50%);
    }
    50% {
      transform: translate(50%, 20%);
    }
    to {
      transform: translate(50%, 50%);
    }
`;

export const DownArrow = styled(downArrow)`
  animation: ${upDown} infinite 2s ease;
  position: absolute;
  bottom: 0;
  right: 50%;
  z-index: 100;
  cursor: pointer;
  fill: white;
  width: 34px;
  height: 34px;
`;

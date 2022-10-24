import styled, { keyframes } from 'styled-components';
import { ReactComponent as downArrow } from '../../../assets/icons/angle-down.svg';

import WaveSVG from '../../../assets/icons/wave.svg';
import { ReactComponent as HeroSVG } from '../../../assets/icons/hero.svg';

export const HeroText = styled.div`
  color: white;
  max-width: 40rem;
  z-index: 3;

  h2 {
    font-size: 3rem;
    padding-bottom: 10px;

    @media (max-width: 500px) {
      font-size: 2rem;
    }
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
    background-color: ${({ theme }) => theme.green};

    &:hover {
      background-color: ${({ theme }) => theme.greenHover};
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

  @media (max-width: 1300px) {
    bottom: 100px;
  }

  @media (max-width: 800px) {
    bottom: 0;
  }
`;

export const Wave = styled.div`
  background-image: url(${WaveSVG});
  aspect-ratio: 960/540;
  width: 100%;
  max-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: -10px;
  z-index: -100;
`;

export const HeroImg = styled(HeroSVG)`
  width: 100%;
  position: absolute;
  right: -270px;
  bottom: -400px;
  z-index: 2;
  overflow-x: hidden;

  @media (max-width: 800px) {
    right: -100px;
    bottom: -450px;
  }

  @media (max-width: 550px) {
    right: -50px;
    bottom: -420px;
  }
`;

import styled from 'styled-components';
import WaveSVG from '../../../assets/wave.svg';

export const Wave = styled.div`
  background-image: url(${WaveSVG});
  aspect-ratio: 960/540;
  width: 100%;
  max-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: -100;
`;

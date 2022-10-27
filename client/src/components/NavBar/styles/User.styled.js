import styled from 'styled-components';
import { ReactComponent as DownSVG } from '../../../assets/icons/angle-down.svg';
import me from '../../../assets/me.jpg';

export const StyledUserIcon = styled.div`
  border-radius: 50%;
  border: 1px solid white;
  width: 40px;
  height: 40px;
  background-image: url(${me});
  background-position: center;
  background-size: cover;
`;

export const DownArrow = styled(DownSVG)`
  fill: white;
  width: 12px;
  height: 12px;
  transition: transform 500ms;
`;

export const UserDropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 150px;
  height: max-content;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: initial;
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms;
  color: black;
`;

export const UserContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:focus-within ${UserDropdownContainer} {
    opacity: 1;
    visibility: visible;
  }

  &:focus-within ${DownArrow} {
    transition: transform 400ms;
    transform: rotate(180deg);
  }
`;

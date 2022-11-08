import styled from 'styled-components';
import { ReactComponent as BellSVG } from '../../../assets/icons/bell.svg';

export const StyledNotificationsIcon = styled(BellSVG)`
  fill: white;
  width: 24px;
  height: 24px;
`;

export const NotificationsCounter = styled.p`
  position: absolute;
  font-size: 0.9rem;
  line-height: 16px;
  top: -8px;
  right: 10px;
  background-color: ${({ theme }) => theme.green};
  border-radius: 9999px;
  width: max-content;
  min-width: 1rem;
  padding-inline: 4px;
`;

export const NotificationsDropdownContainer = styled.div`
  color: black;
  position: absolute;
  top: 42px;
  right: 0;
  width: 300px;
  min-height: 200px;
  max-height: 500px;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: initial;
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms;
  padding: 10px 5px 10px 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: black;
  }

  @media (max-width: 520px) {
    position: fixed;
    transform: translateX(-50%);
    left: 50%;
    top: 80px;
  }
`;

export const NotificatonsContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:focus-within ${NotificationsDropdownContainer} {
    opacity: 1;
    visibility: visible;
  }
`;

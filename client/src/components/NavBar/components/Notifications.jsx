import {
  NotificationsCounter,
  NotificatonsContainer,
  StyledNotificationsIcon,
} from '../styles/Notifications.styled';
import { NotificationsDropdown } from './NotificationsDropdown';

export const Notifications = () => {
  return (
    <NotificatonsContainer tabIndex="0">
      <NotificationsCounter>77</NotificationsCounter>
      <StyledNotificationsIcon />
      <NotificationsDropdown />
    </NotificatonsContainer>
  );
};

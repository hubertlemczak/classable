import {
  DownArrow,
  StyledUserIcon,
  UserContainer,
} from '../styles/User.styled';
import { UserDropdown } from './UserDropdown';

export const UserIcon = () => {
  return (
    <UserContainer tabIndex="0">
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <StyledUserIcon />
        <DownArrow />
      </div>
      <UserDropdown />
    </UserContainer>
  );
};

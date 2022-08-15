import { capitalizeFirstLetter } from '../../../../../utils/capitalizeFirstLetter';
import { StyledActiveUser } from '../styles/ActiveUser.styled';

export const ActiveUser = props => {
  return (
    <StyledActiveUser>
      <div></div>
      <span>{capitalizeFirstLetter(props.chat)}</span>
    </StyledActiveUser>
  );
};

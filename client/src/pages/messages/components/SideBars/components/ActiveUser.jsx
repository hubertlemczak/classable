import { StyledActiveUser } from '../styles/ActiveUser.styled';

export const ActiveUser = ({ firstName, lastName, id }) => {
  return (
    <StyledActiveUser>
      <div></div>
      <span className="text-sm">
        {firstName} {lastName}
      </span>
    </StyledActiveUser>
  );
};

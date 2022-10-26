import { StyledUserItem } from '../styles/ChatItem.styled';

export const ActiveUser = ({ firstName, lastName, id }) => {
  console.log(id);
  return (
    <StyledUserItem>
      <div></div>
      <span className="text-sm">
        {firstName} {lastName}
      </span>
    </StyledUserItem>
  );
};

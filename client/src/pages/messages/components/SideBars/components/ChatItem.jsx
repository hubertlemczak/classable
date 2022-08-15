import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../../utils/capitalizeFirstLetter';
import { StyledChatItem, UsersSVG } from '../styles/ChatItem.styled';

export const ChatItem = props => {
  const navigate = useNavigate();

  return (
    <StyledChatItem onClick={() => navigate('')}>
      {props.chat === 'general' ? <UsersSVG /> : <div></div>}
      <span>{capitalizeFirstLetter(props.chat)}</span>
    </StyledChatItem>
  );
};

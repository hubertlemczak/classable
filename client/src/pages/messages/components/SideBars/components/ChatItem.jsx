import { capitalizeFirstLetter } from '../../../../../utils/capitalizeFirstLetter';
import { StyledChatItem, UsersSVG } from '../styles/ChatItem.styled';

export const ChatItem = props => {
  return (
    <StyledChatItem>
      {props.chat === 'general' ? <UsersSVG /> : <div></div>}
      <span>{capitalizeFirstLetter(props.chat)}</span>
    </StyledChatItem>
  );
};

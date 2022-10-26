import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../../utils/capitalizeFirstLetter';
import { StyledUserItem, UsersSVG } from '../styles/ChatItem.styled';

export const ChatItem = props => {
  const navigate = useNavigate();

  return (
    <StyledUserItem onClick={() => navigate('./123')}>
      {props.chat === 'general' ? <UsersSVG /> : <div></div>}
      <span>{capitalizeFirstLetter(props.chat)}</span>
    </StyledUserItem>
  );
};

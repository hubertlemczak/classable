import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledCreateCourseBtn = styled(Link)`
  font-weight: bold;
  color: white;
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 100px;
  border: none;
  background-color: #2bc48a;
  position: absolute;
  right: 10px;
  bottom: 10px;

  @media (max-width: 800px) {
    padding: 20px;
  }

  &:hover {
    background-color: #12db8e;
  }
`;

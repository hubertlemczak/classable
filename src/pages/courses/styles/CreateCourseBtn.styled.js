import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as AddSVG } from '../../../assets/add.svg';

export const StyledCreateCourseBtn = styled(Link)`
  font-weight: bold;
  color: white;
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 100px;
  border: none;
  background-color: #2bc48a;
  position: absolute;
  right: 20px;
  top: 20px;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    padding: 0;
  }

  &:hover {
    background-color: #12db8e;
  }
`;

export const Add = styled(AddSVG)`
  width: 40px;
  height: 40px;
`;

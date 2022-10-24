import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as AddSVG } from '../../../assets/icons/plus.svg';

export const StyledCreateCourseBtn = styled(Link)`
  font-weight: bold;
  color: white;
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 100px;
  border: none;
  background-color: ${({ theme }) => theme.green};
  position: absolute;
  right: 20px;
  top: 20px;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    padding: 0;
    top: 30px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.greenHover};
  }
`;

export const Add = styled(AddSVG)`
  width: 20px;
  height: 20px;
  fill: white;
`;

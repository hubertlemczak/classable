import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CourseCardContainer = styled.div`
  width: 250px;
  height: 350px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px #dededf;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  div {
    text-align: center;

    h3 {
      font-size: 1.5rem;
      padding-bottom: 6px;
    }

    p {
      color: gray;
      font-size: 0.9rem;
    }
  }
`;

export const CourseIMG = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export const ViewBtn = styled(Link)`
  color: gray;
  font-size: 1rem;
  font-weight: bold;
`;

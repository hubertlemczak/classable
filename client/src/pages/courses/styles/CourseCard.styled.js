import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CourseCardContainer = styled.div`
  width: 250px;
  height: 350px;
  border: 1px solid black;
  border-radius: 8px;
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
      font-size: 0.9rem;
    }
  }
`;

export const CourseIMG = styled.img`
  width: 150px;
  height: 150px;
  border: 1px solid black;
  border-radius: 50%;
`;

export const ViewBtn = styled(Link)`
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.6rem 3rem;
  border: 1px solid black;
  border-radius: 100px;
`;

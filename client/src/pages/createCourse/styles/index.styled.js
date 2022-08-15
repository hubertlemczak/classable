import styled from 'styled-components';

export const CreateCourseForm = styled.form`
  max-width: 66rem;
  margin: 40px auto;
  flex-direction: column;
  align-items: center;

  button {
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 1rem 2rem;
    border-radius: 100px;
    border: none;
    background-color: ${({ theme }) => theme.green};

    &:hover {
      background-color: ${({ theme }) => theme.greenHover};
    }
  }

  @media (max-width: 930px) {
    & {
      display: flex;
    }
  }
`;

export const CreateCourseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 10px;

  @media (max-width: 930px) {
    & {
      gap: 50px;
      align-items: center;
      flex-direction: column;
    }
    h2 {
      text-align: center;
    }
  }
`;

export const CreateCourseFormContainer = styled.div`
  width: clamp(320px, 49%, 500px);
  font-size: 1.3rem;
`;

import useWindowSize from '../../../hooks/useWindowSize';
import { StyledCreateCourseBtn } from '../styles/CreateCourseBtn.styled';

export const CreateCourseBtn = () => {
  const { width } = useWindowSize();

  return (
    <StyledCreateCourseBtn to="/join">
      {width <= 800 ? '+' : 'Create Course'}
    </StyledCreateCourseBtn>
  );
};

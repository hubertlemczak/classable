import useWindowSize from '../../../hooks/useWindowSize';
import { STRING } from '../../../utils/vars';
import { StyledCreateCourseBtn } from '../styles/CreateCourseBtn.styled';
import { Add } from '../styles/CreateCourseBtn.styled';

export const CreateCourseBtn = () => {
  const { width } = useWindowSize();

  return (
    <StyledCreateCourseBtn to="/create-course">
      {width <= 800 ? <Add /> : STRING.CREATE_COURSE}
    </StyledCreateCourseBtn>
  );
};

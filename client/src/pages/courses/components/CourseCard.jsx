import { STRING } from '../../../utils/vars';
import {
  CourseCardContainer,
  CourseIMG,
  ViewBtn,
} from '../styles/CourseCard.styled';

export const CourseCard = ({ category, name, id }) => {
  const coursePath = name.toLowerCase().replace(' ', '-');

  return (
    <CourseCardContainer>
      <CourseIMG />
      <div>
        <h3>{name}</h3>
        <p>{category}</p>
      </div>
      <ViewBtn to={`/courses/${coursePath}/dashboard`} state={{ id }}>
        {STRING.VIEW}
      </ViewBtn>
    </CourseCardContainer>
  );
};

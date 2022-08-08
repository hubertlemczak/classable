import {
  CourseCardContainer,
  CourseIMG,
  ViewBtn,
} from '../styles/CourseCard.styled';

export const CourseCard = () => {
  return (
    <CourseCardContainer>
      <CourseIMG />
      <div>
        <h3>Boolean UK</h3>
        <p>Software Development</p>
      </div>
      <ViewBtn>View</ViewBtn>
    </CourseCardContainer>
  );
};

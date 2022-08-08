import { STRING } from '../../utils/vars';
import { CourseCard } from './components/CourseCard';
import { CreateCourseBtn } from './components/CreateCourseBtn';
import { CardsContainer, CoursesContainer } from './styles/index.styled';

export const Courses = () => {
  return (
    <CoursesContainer>
      <h2>{STRING.YOUR_COURSES}</h2>
      <CardsContainer>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </CardsContainer>
      <CreateCourseBtn />
    </CoursesContainer>
  );
};

import { CourseCard } from './components/CourseCard';
import { CreateCourseBtn } from './components/CreateCourseBtn';
import { CardContainer, CoursesContainer } from './styles/index.styled';

export const Courses = () => {
  return (
    <CoursesContainer>
      <h2>Your Courses</h2>
      <CardContainer>
        <CourseCard />
      </CardContainer>
      <CreateCourseBtn />
    </CoursesContainer>
  );
};

import { useEffect } from 'react';
import { useState } from 'react';

import client from '../../client';
import { STRING } from '../../utils/vars';

import { CourseCard } from './components/CourseCard';
import { CreateCourseBtn } from './components/CreateCourseBtn';
import { CardsContainer, CoursesContainer } from './styles/index.styled';

export const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const res = await client.get('/courses?user=true');
      setCourses(res.data.courses);
    }

    getCourses();
  }, []);

  return (
    <CoursesContainer>
      <h2>{STRING.YOUR_COURSES}</h2>
      <CardsContainer>
        {courses?.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </CardsContainer>
      <CreateCourseBtn />
    </CoursesContainer>
  );
};

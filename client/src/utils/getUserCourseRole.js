import { useLoggedInUser } from '../context/LoggedInUser';
import { formatCourseName } from './formatCourseName';

export default function getUserCourseRole() {
  const { user } = useLoggedInUser();
  const courseName = formatCourseName();

  const { role } = user.courses.find(
    course => course.course.name.toLowerCase() === courseName
  );

  return role;
}

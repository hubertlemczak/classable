import { useParams } from 'react-router-dom';

export function formatCourseName() {
  const { courseName } = useParams();
  const formattedCourseName = courseName.replaceAll('-', ' ');
  return formattedCourseName;
}

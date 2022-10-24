import { Route, Routes } from 'react-router-dom';

import Classroom from './components/Classroom';
import VideoRoom from './components/VideoRoom';

export default function ClassroomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Classroom />} />
      <Route path="/:id" element={<VideoRoom />} />
    </Routes>
  );
}

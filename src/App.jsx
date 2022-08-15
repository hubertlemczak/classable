import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Assignments from './pages/assignments';
import Calendar from './pages/calendar';
import { Courses } from './pages/courses';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import { HomeNavBar } from './pages/home/components/HomeNavBar';
import Join from './pages/join';
import Messages from './pages/messages';
import Notes from './pages/notes';
import Resources from './pages/resources';
import Classroom from './pages/classroom';
import CreateCourse from './pages/createCourse';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeNavBar />}>
          <Route index element={<Home />} />
          <Route path="join" element={<Join />} />
        </Route>
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="courses" element={<NavBar />}>
          <Route index element={<Courses />} />
          <Route path=":courseName" element={<SideBar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="resources" element={<Resources />} />
            <Route path="messages/*" element={<Messages />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="classroom" element={<Classroom />} />
            <Route path="notes" element={<Notes />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

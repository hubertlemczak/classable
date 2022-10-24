import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
import Resources from './pages/resources';
import Classroom from './pages/classroom';
import CreateCourse from './pages/createCourse';
import { useLoggedInUser } from './context/LoggedInUser';
import SocketProvider from './context/SocketProvider';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeNavBar />}>
          <Route index element={<Home />} />
          <Route path="join" element={<Join />} />
        </Route>
        <Route element={<Authenticate />}>
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="courses" element={<NavBar />}>
            <Route index element={<Courses />} />
            <Route path=":courseName" element={<SideBar />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="messages/*" element={<Messages />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="classroom/*" element={<Classroom />} />
              <Route path="resources/*" element={<Resources />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

const Authenticate = () => {
  const { token } = useLoggedInUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/join');
    }
  }, [token]);

  return (
    token && (
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    )
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar';
import { Courses } from './pages/courses';
import Home from './pages/home';
import { HomeNavBar } from './pages/home/components/HomeNavBar';
import Join from './pages/join';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeNavBar />}>
          <Route index element={<Home />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="/courses" element={<NavBar />}>
          <Route index element={<Courses />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

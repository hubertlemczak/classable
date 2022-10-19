import { Routes, Route, Outlet } from 'react-router-dom';

import SideBars from './components/SideBars';

const Messages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SideBars />}>
          <Route
            path="tickets"
            element={
              <>
                <h1 className="text-red-500">tickets</h1>
                <Outlet />
              </>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Messages;

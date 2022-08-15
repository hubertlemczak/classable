import { Routes, Route, Outlet } from 'react-router-dom';
import SideBars from './components/SideBars';

const Messages = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<SideBars />}>
          <Route
            path="tickets"
            element={
              <>
                <h1>tickets</h1>
                <Outlet />
              </>
            }
          >
            <Route path=":ticketId" element={<h1>ticketId</h1>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Messages;

import { Routes, Route } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';

import SideBars from './components/SideBars';

const Messages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SideBars />}>
          <Route path=":id" element={<ChatRoom />} />
          <Route
            path="tickets"
            element={<h1 className="text-red-500 h-full">tickets</h1>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Messages;

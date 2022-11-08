import { Route, Routes } from 'react-router-dom';

import InviteToCourse from './components/InviteToCourse';
import Sidebar from './components/Sidebar';

export default function SettingsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/invite" element={<InviteToCourse />} />
        <Route path="/edit" element={<h2>edit course</h2>} />
      </Route>
    </Routes>
  );
}

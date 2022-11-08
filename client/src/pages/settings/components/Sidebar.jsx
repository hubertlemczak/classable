import { Outlet } from 'react-router-dom';
import uniqid from 'uniqid';

import EDIT from '../../../assets/icons/bxs-edit.svg';
import INVITE from '../../../assets/icons/bxs-user-plus.svg';
import SidebarItem from './SidebarItem';

const SETTINGS_BAR = [
  { path: 'invite', text: 'Invite', image: INVITE },
  { path: 'edit', text: 'Edit course', image: EDIT },
];

export default function Sidebar() {
  return (
    <div className="flex gap-5 mx-auto max-w-5xl">
      <div className="max-w-[200px] w-full">
        <ul className="relative space-y-2">
          {SETTINGS_BAR.map(setting => (
            <SidebarItem key={uniqid()} {...setting} />
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

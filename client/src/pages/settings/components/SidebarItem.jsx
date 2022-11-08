import { NavLink } from 'react-router-dom';

export default function SidebarItem({ path, image, text }) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex gap-2 items-center pl-1 ${
            isActive &&
            'before:absolute before:-left-1 before:block before:h-6 before:w-1 before:bg-primaryHover  before:rounded-full'
          }`
        }
      >
        <img className="w-5" src={image} alt="" />
        {text}
      </NavLink>
    </li>
  );
}

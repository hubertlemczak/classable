import { UserDropdownContainer } from '../styles/User.styled';

import { ReactComponent as SIGN_OUT } from '../../../assets/icons/bx-log-out.svg';
import { useLoggedInUser } from '../../../context/LoggedInUser';

export const UserDropdown = () => {
  const { setToken } = useLoggedInUser();

  return (
    <UserDropdownContainer>
      <ul className="mt-2">
        <li className="px-5 py-0.5 cursor-pointer hover:text-gray-500">
          Account
        </li>
        <li className="px-5 py-0.5 cursor-pointer hover:text-gray-500">
          Settings
        </li>
        <li
          className="flex justify-between items-center border-t px-5 py-2 mt-2 cursor-pointer hover:text-gray-500 group"
          onClick={() => setToken('')}
        >
          Sign out
          <SIGN_OUT className="w-5 group-hover:fill-gray-500" />
        </li>
      </ul>
    </UserDropdownContainer>
  );
};

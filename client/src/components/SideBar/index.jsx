import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import client from '../../client';
import { useLoggedInUser } from '../../context/LoggedInUser';
import { formatCourseName } from '../../utils/formatCourseName';

import { NavLinkItem } from './components/NavLinkItem';
import { OutletContainer, SideBarContainer } from './styles/index.styled';

const NAV_LINKS = [
  'dashboard',
  'assignments',
  'resources',
  'messages',
  'calendar',
  'classroom',
];

const SideBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const courseName = formatCourseName();
  const { user } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function isUserEnrolled() {
      try {
        const res = await client.get(
          `/courses?courseName=${courseName}&user=true`
        );

        const isEnrolled = res.data.courses.length > 0;

        if (!isEnrolled) {
          navigate('/courses', { replace: true });
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (user.id && courseName) {
      isUserEnrolled();
      setIsLoading(false);
    }
  }, [user, courseName]);

  if (isLoading) return;

  return (
    <div className="flex">
      <SideBarContainer>
        <ul>
          {NAV_LINKS.map(link => (
            <NavLinkItem key={uniqid()} path={link} />
          ))}
        </ul>
      </SideBarContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </div>
  );
};

export default SideBar;

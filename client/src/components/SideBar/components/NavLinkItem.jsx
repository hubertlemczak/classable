import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { StyledNavLink } from '../styles/NavLinkItem.styled';
import { ReactComponent as Dashboard } from '../../../assets/icons/home.svg';
import { ReactComponent as DashboardSolid } from '../../../assets/icons/home-solid.svg';
import { ReactComponent as Assignments } from '../../../assets/icons/assignments.svg';
import { ReactComponent as AssignmentsSolid } from '../../../assets/icons/assignments-solid.svg';
import { ReactComponent as Resources } from '../../../assets/icons/resources.svg';
import { ReactComponent as ResourcesSolid } from '../../../assets/icons/resources-solid.svg';
import { ReactComponent as Messages } from '../../../assets/icons/messages.svg';
import { ReactComponent as MessagesSolid } from '../../../assets/icons/messages-solid.svg';
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg';
import { ReactComponent as CalendarSolid } from '../../../assets/icons/calendar-solid.svg';
import { ReactComponent as Classroom } from '../../../assets/icons/classroom.svg';
import { ReactComponent as ClassroomSolid } from '../../../assets/icons/classroom-solid.svg';

const SVGs = {
  dashboard: <Dashboard />,
  dashboardSolid: <DashboardSolid />,
  assignments: <Assignments />,
  assignmentsSolid: <AssignmentsSolid />,
  resources: <Resources />,
  resourcesSolid: <ResourcesSolid />,
  messages: <Messages />,
  messagesSolid: <MessagesSolid />,
  calendar: <Calendar />,
  calendarSolid: <CalendarSolid />,
  classroom: <Classroom />,
  classroomSolid: <ClassroomSolid />,
};

export const NavLinkItem = ({ path }) => {
  return (
    <li>
      <StyledNavLink
        to={path}
        // eslint-disable-next-line react/no-children-prop
        children={({ isActive }) => {
          return (
            <>
              {isActive ? SVGs[`${path}Solid`] : SVGs[path]}

              <span>{capitalizeFirstLetter(path)}</span>
            </>
          );
        }}
      />
    </li>
  );
};

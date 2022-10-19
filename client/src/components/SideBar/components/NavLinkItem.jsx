import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { StyledNavLink } from '../styles/NavLinkItem.styled';
import { ReactComponent as Dashboard } from '../../../assets/home.svg';
import { ReactComponent as DashboardSolid } from '../../../assets/home-solid.svg';
import { ReactComponent as Assignments } from '../../../assets/assignments.svg';
import { ReactComponent as AssignmentsSolid } from '../../../assets/assignments-solid.svg';
import { ReactComponent as Resources } from '../../../assets/resources.svg';
import { ReactComponent as ResourcesSolid } from '../../../assets/resources-solid.svg';
import { ReactComponent as Messages } from '../../../assets/messages.svg';
import { ReactComponent as MessagesSolid } from '../../../assets/messages-solid.svg';
import { ReactComponent as Calendar } from '../../../assets/calendar.svg';
import { ReactComponent as CalendarSolid } from '../../../assets/calendar-solid.svg';
import { ReactComponent as Classroom } from '../../../assets/classroom.svg';
import { ReactComponent as ClassroomSolid } from '../../../assets/classroom-solid.svg';

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

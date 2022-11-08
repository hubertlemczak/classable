import { NotificationsDropdownContainer } from '../styles/Notifications.styled';

export const NotificationsDropdown = () => {
  return (
    <NotificationsDropdownContainer>
      <ul>
        <li className="p-3 border border-gray-100 shadow-sm rounded-md mb-2">
          <p className="text-sm leading-4">
            Hubert Lemczak has invited you to join
            <strong> Demo Course 2</strong>
          </p>
          <div className="mt-2">
            <button className="px-2.5 py-1 text-xs font-bold bg-primary rounded-md hover:bg-primaryHover">
              Accept
            </button>
            <button className="px-2.5 py-1 text-xs font-bold rounded-sm hover:text-red-600">
              Decline
            </button>
          </div>
        </li>
      </ul>
    </NotificationsDropdownContainer>
  );
};

import { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../client';

import { ReactComponent as REMOVESVG } from '../../../assets/icons/bx-trash.svg';

import FormInput from '../../../components/form/FormInput';
import { CreateCourseFormContainer } from '../styles/index.styled';
import { useLoggedInUser } from '../../../context/LoggedInUser';

let timeOut;

export const Invite = ({ formFields, setFormFields }) => {
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [getUsers, setGetUsers] = useState(false);

  const { user } = useLoggedInUser();

  function handleInviteUser(user) {
    const isInUserList = formFields.users.find(u => u.userId === user.id);

    if (!isInUserList) {
      setFormFields(prev => ({
        ...prev,
        users: [
          ...prev.users,
          { userId: user.id, role: 'STUDENT', email: user.email },
        ],
      }));
    }
  }

  function handleDeleteUser(id) {
    setFormFields(prev => ({
      ...prev,
      users: prev.users.filter(user => user.userId !== id),
    }));
  }

  function handleRoleChange(e, id) {
    const newUsers = formFields.users.map(user => {
      if (user.userId === id) {
        return { ...user, role: e.target.value };
      }
      return user;
    });

    setFormFields(prev => ({
      ...prev,
      users: newUsers,
    }));
  }

  function handleChange(e) {
    setSearchInput(e.target.value);

    if (!e.target.value) {
      setSearchUsers([]);
    }

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      setGetUsers(true);
    }, 500);

    setGetUsers(false);
  }

  useEffect(() => {
    async function getUsersBySearch() {
      try {
        const res = await client.get(`/users?email=${searchInput}`);

        const foundUsers = res.data.users.filter(usr => usr.id !== user.id);

        setSearchUsers(foundUsers);
        setGetUsers(false);
      } catch (err) {
        console.error(err);
        setGetUsers(false);
      }
    }

    if (getUsers && searchInput) getUsersBySearch();
  }, [getUsers]);

  return (
    <CreateCourseFormContainer>
      <h2>Invite users to your course</h2>
      <FormInput
        label="Search users by email"
        type="text"
        value={searchInput}
        onChange={handleChange}
      />
      {searchUsers.map(user => (
        <div key={user.id} className="" onClick={() => handleInviteUser(user)}>
          {user.email}
        </div>
      ))}
      {formFields.users.map(user => (
        <div key={user.userId} className="flex items-center justify-between">
          <span>{user.email}</span>
          <div className="flex gap-5 items-center">
            <select
              name="role"
              className="text-base"
              onChange={e => handleRoleChange(e, user.userId)}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="TEACHER">TEACHER</option>
              <option value="COURSEADMIN">COURSEADMIN</option>
            </select>
            <REMOVESVG
              className="fill-red-500 w-5"
              onClick={() => handleDeleteUser(user.userId)}
            />
          </div>
        </div>
      ))}
    </CreateCourseFormContainer>
  );
};

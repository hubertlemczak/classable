import { useState } from 'react';
import uniqid from 'uniqid';
import FormInput from '../../../components/form/FormInput';
import { CreateCourseFormContainer } from '../styles/index.styled';

export const Invite = ({ props: { userId, handleChange } }) => {
  const [users, setUsers] = useState([]);

  const handleBlur = () => {
    console.log('blur');
    if (userId) {
      setUsers([...users, userId]);
    }
  };
  return (
    <CreateCourseFormContainer>
      <h2>Invite users to your course</h2>
      {users.map(user => (
        <h1 key={uniqid()}>{user}</h1>
      ))}
      <FormInput
        label="User Id"
        type="text"
        name="userId"
        value={userId}
        onBlur={handleBlur}
        onChange={handleChange}
        required
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <label htmlFor="moderator">Moderator</label>
        <input id="moderator" type="checkbox" name="moderator" required />
      </div>
    </CreateCourseFormContainer>
  );
};

import { useState } from 'react';
import client from '../../../client';
import Button from '../../../components/Button';
import { formatCourseName } from '../../../utils/formatCourseName';
import { Invite } from '../../createCourse/components/Invite';

export default function InviteToCourse() {
  const courseName = formatCourseName();

  const [formFields, setFormFields] = useState({ users: [], courseName });

  async function handleInvite() {
    try {
      await client.post('/courses/invite', formFields);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Invite {...{ formFields, setFormFields }} />
      <Button onClick={handleInvite}>Invite</Button>
    </div>
  );
}

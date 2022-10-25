import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import client from '../../../client';
import Button from '../../../components/Button';
import FormInput from '../../../components/form/FormInput';

function CreateClassroom() {
  const [createRoomData, setCreateRoomData] = useState({
    name: '',
    password: '',
  });
  const [isCreating, setIsCreating] = useState(false);

  const { name, password } = createRoomData;

  const navigate = useNavigate();
  const { courseName } = useParams();

  const formattedCourseName = courseName.replace('-', ' ');

  const handleCreateRoom = async e => {
    e.preventDefault();

    try {
      const res = await client.post('/classrooms', {
        courseName: formattedCourseName,
        name,
        password,
      });

      const { token } = res.data;
      const channel = res.data.classroom.name;
      const id = res.data.classroom.id;

      setIsCreating(false);
      navigate(`./${id}`, { state: { channel, token } });
    } catch (err) {
      console.error(err);
      setIsCreating(false);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setCreateRoomData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <>
      {isCreating && (
        <div
          className="bg-gray-300 fixed inset-0 bg-opacity-70 grid place-items-center z-50"
          onClick={() => setIsCreating(false)}
        >
          <form
            onClick={e => e.stopPropagation()}
            className="max-w-xs w-full bg-white rounded-md p-5 shadow-xl sm:max-w-md"
            onSubmit={handleCreateRoom}
          >
            <h2 className="text-lg">Create Classroom</h2>
            <FormInput
              label="Room Name"
              type="text"
              name="name"
              required
              value={name}
              onChange={handleChange}
            />
            <FormInput
              label="Room Password (optional)"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Button>Create Room</Button>
          </form>
        </div>
      )}

      <Button
        className="block ml-auto mb-5"
        onClick={() => setIsCreating(true)}
      >
        Create Classroom
      </Button>
    </>
  );
}

export default CreateClassroom;

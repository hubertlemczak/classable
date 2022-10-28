import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../client';
import Button from '../../../components/Button';
import FormInput from '../../../components/form/FormInput';

function RoomItem({ id, name, password }) {
  const [isJoining, setIsJoining] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  async function handleJoinRequest(e) {
    if (password) {
      setIsJoining(true);
    } else {
      handleJoinRoom(e);
    }
  }

  async function handleJoinRoom(e) {
    e.preventDefault();

    try {
      const res = await client.post(`/classrooms/${id}`, {
        password: passwordInput,
      });

      const { token } = res.data;

      navigate(`./${id}`, { state: { channel: name, token } });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {isJoining && (
        <div
          className="bg-gray-300 fixed inset-0 bg-opacity-70 grid place-items-center z-50"
          onClick={() => setIsJoining(false)}
        >
          <form
            onClick={e => e.stopPropagation()}
            className="max-w-xs w-full bg-white rounded-md p-5 shadow-xl sm:max-w-md"
            onSubmit={handleJoinRoom}
          >
            <h2 className="text-lg">
              This room is password protected. Please enter the password.
            </h2>
            <FormInput
              label="Room Password"
              type="password"
              name="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
            />
            <Button>Join {name}</Button>
          </form>
        </div>
      )}
      <div
        className=" relative bg-gray-200 h-32 w-48 p-3 rounded-md flex-shrink-0 cursor-pointer group overflow-hidden hover:bg-gray-300"
        tabIndex={0}
        key={id}
        onClick={e => handleJoinRequest(e)}
      >
        <h3 className="font-bold text-xl">{name}</h3>
      </div>
    </>
  );
}

export default RoomItem;

import { useNavigate } from 'react-router-dom';
import RoomList from './RoomList';

export default function Classroom() {
  const navigate = useNavigate();
  return (
    <div>
      <RoomList />
      {/* <button
        onClick={() => navigate('./1', { state: { channel: 'test channel' } })}
      >
        Join Room
      </button> */}
    </div>
  );
}

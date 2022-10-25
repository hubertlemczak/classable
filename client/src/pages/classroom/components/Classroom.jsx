import { useNavigate } from 'react-router-dom';

export default function Classroom() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate('./1', { state: { channel: 'test channel' } })}
      >
        Join Room
      </button>
    </div>
  );
}

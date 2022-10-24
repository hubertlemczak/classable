import { useNavigate } from 'react-router-dom';

export default function Classroom() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('./1')}>Join Room</button>
    </div>
  );
}

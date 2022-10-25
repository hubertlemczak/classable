import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../../client';
import Spinner from '../../../components/Spinner';
import CreateClassroom from './CreateClassroom';
import RoomItem from './RoomItem';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const { courseName } = useParams();
  const formattedCourseName = courseName.replace('-', ' ');

  useEffect(() => {
    async function getRooms() {
      try {
        const res = await client.get(
          `/classrooms?courseName=${formattedCourseName}`
        );
        console.log(res.data);
        setRooms(res.data.classrooms);
        setisLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getRooms();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <CreateClassroom />
      <h1 className="text-2xl font-bold mb-4">Available rooms</h1>
      <div className="flex gap-4">
        {rooms?.map(room => (
          <RoomItem key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;

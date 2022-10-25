import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../../../client';
import { useLoggedInUser } from '../../../context/LoggedInUser';
import VideoPlayer from './VideoPlayer';

import {
  useClient,
  useMicrophoneAndCameraTracks,
  agoraOptions,
} from '../utils/agora';
import Spinner from '../../../components/Spinner';

export default function VideoRoom() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const agoraClient = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const { user } = useLoggedInUser();
  const location = useLocation();
  const { channel, token } = location.state;

  if (!user.id || !location.state.channel) return;

  async function handleUserPublished(usr, mediaType) {
    await agoraClient.subscribe(usr, mediaType);
    console.log('here');
    const res = await client.get(`/users/${usr.uid}`);

    const { firstName, lastName } = res.data.user.profile;

    usr.firstName = firstName;
    usr.lastName = lastName;

    if (mediaType === 'audio') {
      usr.audioTrack?.play();
    }

    if (mediaType === 'video') {
      setUsers(prev => [...prev, usr]);
    }
  }

  function handleUserUnpublished(usr, mediaType) {
    if (mediaType === 'audio') {
      usr.audioTrack?.stop();
    }

    if (mediaType === 'video') {
      setUsers(prev => prev.filter(p => p.uid !== usr.uid));
    }
  }

  function handleUserLeft(usr) {
    setUsers(prev => prev.filter(p => p.uid !== usr.uid));
  }

  useEffect(() => {
    async function init() {
      agoraClient.on('user-published', handleUserPublished);
      agoraClient.on('user-unpublished', handleUserUnpublished);
      agoraClient.on('user-left', handleUserLeft);

      console.error('joining');
      await agoraClient.join(agoraOptions.appId, channel, token, user?.id);

      agoraClient.publish(tracks);

      setUsers(prev => [
        ...prev,
        {
          uid: user.id,
          videoTrack: tracks[1],
          audioTrack: tracks[0],
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
        },
      ]);
    }

    if (ready && tracks && user?.id) {
      init();
      setIsLoading(false);
    }
  }, [ready, tracks, agoraClient, user]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      {users?.map(user => (
        <VideoPlayer key={user.uid} user={user} />
      ))}
    </div>
  );
}

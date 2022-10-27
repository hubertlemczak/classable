import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoggedInUser } from '../../../context/LoggedInUser';

import { useClient, useMicrophoneAndCameraTracks, appId } from '../utils/agora';
import Spinner from '../../../components/Spinner';
import MediaControls from './MediaControls';
import Video from './Video';
import client from '../../../client';

export default function VideoRoom() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenTracks, setScreenTracks] = useState();

  const agoraClient = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const { user } = useLoggedInUser();
  const location = useLocation();
  const { channel, token } = location.state;

  if (!user.id || !channel) return;

  async function handleUserPublished(usr, mediaType) {
    await agoraClient.subscribe(usr, mediaType);

    console.error('published', usr, mediaType);

    const res = await client.get(`/users/${usr.uid}`);

    const { firstName, lastName } = res.data.user.profile;

    usr.firstName = firstName;
    usr.lastName = lastName;

    if (mediaType === 'audio') {
      usr.audioTrack?.play();
    }

    if (mediaType === 'video') {
      const foundUser = users.find(u => u.uid === usr.uid);

      if (!foundUser) {
        setUsers(prev => [...prev, usr]);
      }
    }
  }

  function handleUserUnpublished(usr, mediaType) {
    console.error('unpublished', usr, mediaType);

    if (mediaType === 'audio') {
      usr.audioTrack?.stop();
    }

    if (mediaType === 'video') {
      setUsers(prev => prev.filter(p => p.uid !== usr.uid));
    }
  }

  function handleUserLeft(usr) {
    console.error('leaving');
    setUsers(prev => prev.filter(p => p.uid !== usr.uid));
  }

  useEffect(() => {
    agoraClient.on('user-published', handleUserPublished);
    agoraClient.on('user-unpublished', handleUserUnpublished);
    agoraClient.on('user-left', handleUserLeft);

    async function join() {
      console.error('joining');
      await agoraClient.join(appId, channel, token, user.id);

      agoraClient.publish(tracks);
    }

    if (ready && tracks && user?.id) {
      join();
      setIsLoading(false);
    }

    return () => {
      console.error('removing');
      agoraClient.off('user-published', handleUserPublished);
      agoraClient.off('user-unpublished', handleUserUnpublished);
      agoraClient.off('user-left', handleUserLeft);
    };
  }, [ready, tracks, agoraClient, user]);

  return isLoading || !tracks ? (
    <Spinner />
  ) : (
    <div className="bg-black bg-opacity-80 absolute inset-0">
      <div>
        {ready && tracks && (
          <MediaControls {...{ screenTracks, tracks, setScreenTracks }} />
        )}
      </div>
      <div
        className="grid place-items-center"
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        {tracks && (
          <Video
            {...{
              tracks,
              users,
              screenTracks,
              firstName: user.profile.firstName,
              lastName: user.profile.lastName,
            }}
          />
        )}
      </div>
    </div>
  );
}

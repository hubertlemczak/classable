import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoggedInUser } from '../../../context/LoggedInUser';

import { useClient, useMicrophoneAndCameraTracks, appId } from '../utils/agora';
import Spinner from '../../../components/Spinner';
import MediaControls from './MediaControls';
import Video from './Video';

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

    // const res = await client.get(`/users/${usr.uid}`);

    // const { firstName, lastName } = res.data.user.profile;

    // usr.firstName = 'ho';
    // usr.lastName = 'h';

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
    <div>
      <div>
        {ready && tracks && (
          <MediaControls {...{ screenTracks, tracks, setScreenTracks }} />
        )}
      </div>
      <div>
        {tracks && (
          <Video tracks={tracks} users={users} screenTracks={screenTracks} />
        )}
      </div>
    </div>
  );
}

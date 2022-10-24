import AgoraRTC from 'agora-rtc-sdk-ng';
import { useEffect, useState } from 'react';
import client from '../../../client';
import { useLoggedInUser } from '../../../context/LoggedInUser';
import VideoPlayer from './VideoPlayer';

const agoraOptions = {
  // eslint-disable-next-line no-undef
  appId: process.env.REACT_APP_AGORA_APPID,
  token:
    '007eJxTYGDfMzt90vuTWyemB/B4aa23tAt+fO59evSTRSzb5q5/Hp+jwGBikZyUnGJgZmiaaGpibmiYaGlsaWGQmppmkmhgamySxLMjLLk+kJGBda4gEyMDBIL4PAwlqcUlCskZiXl5qTkMDAB5vCIL',
  channel: 'test channel',
};

const agoraClient = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export default function VideoRoom() {
  const [users, setUsers] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { user } = useLoggedInUser();

  if (!user.id) return;

  async function handleUserPublish(u, mediaType) {
    await agoraClient.subscribe(u, mediaType);

    const res = await client.get(`/users/${u.uid}`);

    const { firstName, lastName } = res.data.user.profile;

    u.firstName = firstName;
    u.lastName = lastName;

    if (mediaType === 'audio') {
      u.audioTrack.play();
    }

    if (mediaType === 'video') {
      setUsers(prev => [...prev, u]);
    }
  }

  async function handleUserLeft(u) {
    setUsers(prev => prev.filter(p => p.uid !== u.uid));
  }

  useEffect(() => {
    agoraClient.on('user-published', handleUserPublish);
    agoraClient.on('user-left', handleUserLeft);

    async function joinChannel() {
      console.error('joining');
      await agoraClient.join(
        agoraOptions.appId,
        agoraOptions.channel,
        agoraOptions.token,
        user?.id
      );

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();

      agoraClient.publish([audioTrack, videoTrack]);

      setUsers(prev => [
        ...prev,
        {
          uid: user.id,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          videoTrack,
          audioTrack,
        },
      ]);

      setTracks([audioTrack, videoTrack]);
    }

    if (agoraClient.connectionState === 'DISCONNECTED') {
      joinChannel();
    }

    return () => {
      for (let track of tracks) {
        track.stop();
        track.close();
      }

      agoraClient.off('user-published');
      agoraClient.off('user-left');

      if (tracks.length > 0) {
        agoraClient.unpublish(tracks).then(() => agoraClient.leave());
      }
    };
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div>
      {users?.map(user => (
        <VideoPlayer key={user.uid} user={user} />
      ))}
    </div>
  );
}

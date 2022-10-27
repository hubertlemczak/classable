import { AgoraVideoPlayer } from 'agora-rtc-react';

import { ReactComponent as MIC_OFF } from '../../../assets/icons/bxs-microphone-off.svg';
import RemoteVideo from './RemoteVideo';

export default function Video({
  users,
  tracks,
  screenTracks,
  firstName,
  lastName,
  trackState,
}) {
  console.log(users);
  return (
    <div className="flex gap-8 flex-wrap items-center justify-center h-fit my-auto">
      {screenTracks && (
        <div className="relative h-44 w-72 rounded-md overflow-clip">
          <p className="absolute bottom-0 left-0 z-10 px-1 bg-gray-700 bg-opacity-70 text-white text-sm rounded-tr-md">
            {firstName} {lastName}
          </p>
          <AgoraVideoPlayer
            className="w-full h-full"
            videoTrack={screenTracks}
          />
        </div>
      )}
      <div className="relative h-44 w-72 rounded-md overflow-clip">
        <div className="flex gap-2 absolute bottom-0 left-0 z-10 px-1 bg-gray-700 bg-opacity-70 text-white text-sm rounded-tr-md">
          {!trackState.audio && <MIC_OFF className="w-4 fill-red-500" />}
          <span>
            {firstName} {lastName}
          </span>
        </div>
        <AgoraVideoPlayer className="w-full h-full" videoTrack={tracks[1]} />
      </div>
      {users.map(user => (
        <RemoteVideo key={user.id} user={user} />
      ))}
    </div>
  );
}

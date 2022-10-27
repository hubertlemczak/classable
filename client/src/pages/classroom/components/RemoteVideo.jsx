import { AgoraVideoPlayer } from 'agora-rtc-react';
import { useState } from 'react';

import { ReactComponent as MIC_OFF } from '../../../assets/icons/bxs-microphone-off.svg';

function RemoteVideo({ user }) {
  const [isFocused, setIsFocused] = useState(false);

  if (!user.videoTrack) {
    return null;
  }

  return (
    <div
      className={`h-44 w-72 rounded-md overflow-clip ${
        isFocused
          ? 'fixed top-1/2 -left-1/2 translate-x-1/2 -translate-y-1/2 w-screen h-max scale-[0.85] z-10 '
          : 'relative'
      }`}
      onClick={() => setIsFocused(prev => !prev)}
    >
      <div className="flex gap-2 absolute bottom-0 left-0 z-10 px-1 bg-gray-700 bg-opacity-70 text-white text-sm rounded-tr-md">
        {user._audio_muted_ && <MIC_OFF className="w-4 fill-red-500" />}
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </div>
      <AgoraVideoPlayer
        className="w-full h-full aspect-video"
        videoTrack={user.videoTrack}
      />
    </div>
  );
}

export default RemoteVideo;

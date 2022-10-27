import { AgoraVideoPlayer } from 'agora-rtc-react';
import { useState } from 'react';

export default function Video({
  users,
  tracks,
  screenTracks,
  firstName,
  lastName,
}) {
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
        <p className="absolute bottom-0 left-0 z-10 px-1 bg-gray-700 bg-opacity-70 text-white text-sm rounded-tr-md">
          {firstName} {lastName}
        </p>
        <AgoraVideoPlayer className="w-full h-full" videoTrack={tracks[1]} />
      </div>
      {users.map(user => {
        if (user.videoTrack) {
          const [isFocused, setIsFocused] = useState(false);
          return (
            <div
              className={`h-44 w-72 rounded-md overflow-clip ${
                isFocused
                  ? 'fixed top-1/2 -left-1/2 translate-x-1/2 -translate-y-1/2 w-screen h-max scale-[0.85] z-10 '
                  : 'relative'
              }`}
              key={user.uid}
              onClick={() => setIsFocused(prev => !prev)}
            >
              <p className="absolute bottom-0 left-0 z-10 px-1 bg-gray-700 bg-opacity-70 text-white text-sm rounded-tr-md">
                {user?.firstName} {user?.lastName}
              </p>
              <AgoraVideoPlayer
                className="w-full h-full aspect-video"
                videoTrack={user.videoTrack}
              />
            </div>
          );
        } else
          return (
            <div
              className="h-44 w-72 rounded-md overflow-clip bg-black"
              key={user.uid}
            ></div>
          );
      })}
    </div>
  );
}

import { AgoraVideoPlayer } from 'agora-rtc-react';

export default function Video({ users, tracks, screenTracks }) {
  return (
    <div
      className="flex gap-8 flex-wrap items-center justify-center"
      style={{ minHeight: 'calc(100vh - 140px)' }}
    >
      {screenTracks && (
        <div className="h-44 w-72 rounded-md overflow-clip">
          <AgoraVideoPlayer
            className="w-full h-full"
            videoTrack={screenTracks}
          />
        </div>
      )}
      <div className="h-44 w-72 rounded-md overflow-clip">
        <AgoraVideoPlayer className="w-full h-full" videoTrack={tracks[1]} />
      </div>
      {users.map(user => {
        if (user.videoTrack) {
          return (
            <div className="h-44 w-72 rounded-md overflow-clip" key={user.uid}>
              <AgoraVideoPlayer
                className="w-full h-full"
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

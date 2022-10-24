import React, { useEffect, useRef } from 'react';

function VideoPlayer({ user }) {
  const ref = useRef();
  console.log(user);

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      {user.firstName} {user.lastName}
      <div ref={ref} style={{ width: '300px', height: '200px' }}></div>
    </div>
  );
}

export default VideoPlayer;

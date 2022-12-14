import AgoraRTC from 'agora-rtc-react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as MIC_ON } from '../../../assets/icons/bxs-microphone.svg';
import { ReactComponent as MIC_OFF } from '../../../assets/icons/bxs-microphone-off.svg';
import { ReactComponent as CAM_ON } from '../../../assets/icons/bxs-video.svg';
import { ReactComponent as CAM_OFF } from '../../../assets/icons/bxs-video-off.svg';
import { ReactComponent as LEAVE } from '../../../assets/icons/bx-log-out.svg';
import { ReactComponent as SHARE } from '../../../assets/icons/bxs-share.svg';

import { useClient } from '../utils/agora';

function MediaControls({
  tracks,
  screenTracks,
  setScreenTracks,
  trackState,
  setTrackState,
}) {
  const agoraClient = useClient();
  const navigate = useNavigate();

  async function toggleMicrophone() {
    await tracks[0].setEnabled(!trackState.audio);
    setTrackState(prev => ({ ...prev, audio: !prev.audio }));
  }

  async function toggleCamera() {
    await tracks[1].setEnabled(!trackState.video);
    setTrackState(prev => ({ ...prev, video: !prev.video }));
  }

  async function toggleScreenShare() {
    if (trackState.screenShare) {
      await agoraClient.unpublish(screenTracks);
      await agoraClient.publish(tracks[1]);
      setScreenTracks(null);
      setTrackState(prev => ({ ...prev, video: true }));
    } else {
      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      await agoraClient.unpublish(tracks[1]);
      await agoraClient.publish(screenTrack);
      setScreenTracks(screenTrack);
      setTrackState(prev => ({ ...prev, video: false }));
    }

    setTrackState(prev => ({ ...prev, screenShare: !prev.screenShare }));
  }

  async function leaveCall() {
    await agoraClient.leave();
    agoraClient.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    screenTracks?.close();
    navigate('..');
  }

  return (
    <div className="flex gap-10 items-center fixed bottom-5 left-1/2 -translate-x-1/2 z-50 p-2 bg-darkBg rounded-md w-max">
      <div onClick={toggleMicrophone} className="cursor-pointer ">
        {trackState.audio ? (
          <MIC_ON className="fill-primary" title="Mute microphone" />
        ) : (
          <MIC_OFF className="fill-red-500" title="Unnute microphone" />
        )}
      </div>
      <div onClick={toggleCamera} className="cursor-pointer ">
        {trackState.video ? (
          <CAM_ON className="fill-primary" title="Mute video" />
        ) : (
          <CAM_OFF className="fill-red-500" title="Unmute video" />
        )}
      </div>
      <div onClick={toggleScreenShare} className="cursor-pointer ">
        {trackState.screenShare ? (
          <SHARE className="fill-primary" title="Stop share screen" />
        ) : (
          <SHARE className="fill-red-500" title="Start share screen" />
        )}
      </div>
      <div onClick={leaveCall} className="cursor-pointer ">
        <LEAVE className="fill-red-500" title="Leave call" />
      </div>
    </div>
  );
}

export default MediaControls;

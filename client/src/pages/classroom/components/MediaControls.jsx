import AgoraRTC from 'agora-rtc-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as MIC_ON } from '../../../assets/icons/bxs-microphone.svg';
import { ReactComponent as MIC_OFF } from '../../../assets/icons/bxs-microphone-off.svg';
import { ReactComponent as CAM_ON } from '../../../assets/icons/bxs-video.svg';
import { ReactComponent as CAM_OFF } from '../../../assets/icons/bxs-video-off.svg';
import { ReactComponent as LEAVE } from '../../../assets/icons/bx-log-out.svg';
import { ReactComponent as SHARE } from '../../../assets/icons/bxs-share.svg';

import { useClient } from '../utils/agora';

function MediaControls({ tracks, screenTracks, setScreenTracks }) {
  const [trackState, setTrackState] = useState({
    video: true,
    audio: true,
    screenShare: false,
  });

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
    let screenTrack;
    if (!trackState.screenShare) {
      screenTrack = await AgoraRTC.createScreenVideoTrack();
    }

    if (screenTrack) {
      await tracks[1].setEnabled(false);
      await agoraClient.publish(screenTrack);
      await screenTrack.setEnabled(true);
      setTrackState(prev => ({ ...prev, video: false }));
    } else {
      await tracks[1].setEnabled(true);
      await screenTracks.setEnabled(false);
      setTrackState(prev => ({ ...prev, video: true }));
    }

    setScreenTracks(screenTrack);

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
    <div className="flex gap-10 items-center absolute bottom-5 left-1/2 z-50 p-2 bg-darkBg rounded-md">
      <div onClick={toggleMicrophone} className="cursor-pointer">
        {trackState.audio ? (
          <MIC_ON className="fill-primary" title="Mute microphone" />
        ) : (
          <MIC_OFF className="fill-red-500" title="Unnute microphone" />
        )}
      </div>
      <div onClick={toggleCamera} className="cursor-pointer">
        {trackState.video ? (
          <CAM_ON className="fill-primary" title="Mute video" />
        ) : (
          <CAM_OFF className="fill-red-500" title="Unmute video" />
        )}
      </div>
      <div onClick={toggleScreenShare} className="cursor-pointer">
        {trackState.screenShare ? (
          <SHARE className="fill-primary" title="Stop share screen" />
        ) : (
          <SHARE className="fill-red-500" title="Start share screen" />
        )}
      </div>
      <div onClick={leaveCall} className="cursor-pointer">
        <LEAVE className="fill-red-500" title="Leave call" />
      </div>
    </div>
  );
}

export default MediaControls;

import AgoraRTC, {
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from 'agora-rtc-react';

// eslint-disable-next-line no-undef
export const appId = process.env.REACT_APP_AGORA_APPID;

export const useClient = createClient({
  mode: 'rtc',
  codec: 'vp8',
});
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const useScreenVideoTrack = createScreenVideoTrack();

// eslint-disable-next-line no-undef
AgoraRTC.setLogLevel(process.env.NODE_ENV === 'production' ? 4 : 0);

import AgoraRTC, {
  createClient,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';

export const agoraOptions = {
  // eslint-disable-next-line no-undef
  appId: process.env.REACT_APP_AGORA_APPID,
  token:
    '007eJxTYHg8ReYPq1px25bXa57zvirkfRWsx9CrYlu7M+hVY4zu/YcKDCYWyUnJKQZmhqaJpibmhoaJlsaWFgapqWkmiQamxiZJa86FJ9cHMjIouW5lYIRCEJ+HoSS1uEQhOSMxLy81h4EBAGsjInM=',
  channel: 'test channel',
};

export const useClient = createClient({
  mode: 'rtc',
  codec: 'vp8',
});
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

// eslint-disable-next-line no-undef
AgoraRTC.setLogLevel(process.env.NODE_ENV === 'production' ? 4 : 0);

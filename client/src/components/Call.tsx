"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState } from "react";

type CallProps = {
  appId: string; // Agora App ID
  channelName: string; // Channel Name
  isCameraOn: boolean
  isMicOn: boolean
  onToggleCamera: () => void
  onToggleMic: () => void
  onLeave: () => void

};

type VideosProps = {
  appId: string; // Agora App ID
  channelName: string; // Channel Name
  token?: string | null; // Optional token for authentication
  onLeave?: () => void; // Callback for leaving the call
  onError?: (error: Error) => void; // Callback for handling errors
};

function Call({ appId, channelName }: CallProps) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos appId={appId} channelName={channelName} />
    </AgoraRTCProvider>
  );
}

function Videos({
  appId,
  channelName,
  token = null,
  onLeave,
  onError,
}: VideosProps) {
  // Local tracks for microphone and camera
  const { isLoading: isLoadingMic, localMicrophoneTrack, error: micError } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack, error: camError } =
    useLocalCameraTrack();

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Publish local tracks
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Join the channel
  useJoin({
    appid: appId,
    channel: channelName,
    token,
  });

  // Access the RTC client
  const client = useRTCClient();

  // State for camera and microphone
  const [isCameraOn, setCameraOn] = useState(true);
  const [isMicOn, setMicOn] = useState(true);

  // Toggle camera
  const toggleCamera = () => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(!isCameraOn);
      setCameraOn(!isCameraOn);
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(!isMicOn);
      setMicOn(!isMicOn);
    }
  };

  // Leave the call
  const handleLeave = async () => {
    try {
      if (client) {
        await client.leave();
        if (onLeave) onLeave();
        else window.location.href = "/"; // Redirect to home or another page
      }
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  if (isLoadingMic || isLoadingCam) {
    return (
      <div className="flex flex-col items-center pt-40">
        Loading devices...
      </div>
    );
  }

  if (micError || camError) {
    const errorMessage = micError
      ? `Error accessing microphone: ${micError.message}`
      : `Error accessing camera: ${camError?.message}`;

    if (onError) onError(new Error(errorMessage));

    return (
      <div className="flex flex-col items-center pt-40 text-red-500">
        {micError && <p>{errorMessage}</p>}
        {camError && <p>{errorMessage}</p>}
        <p>Please ensure your devices are not in use by another application.</p>
      </div>
    );
  }

  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      {/* Video Grid */}
      <div className="h-52 w-full rounded-md">
        <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          style={{borderRadius: 10}}
          className="w-20 h-28 rounded-md"
        />

        <div
          className={`grid grid-cols-2 md:grid-cols-2 gap-1 p-1`}
        >
          {/* {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div key={idx}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://shorturl.at/WeHfw"
                  alt={`Image ${idx + 1}`}
                />
              </div>
            ))} */}

          {remoteUsers.map((user) => (

            <div key={user.uid} className="h-32 w-32 rounded-lg">
              <RemoteUser user={user} key={user.uid} />
            </div>


          ))}
        </div>



      </div>



      {/* Controls */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={toggleCamera}
          className={`px-4 py-2 text-white rounded-lg ${isCameraOn ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"
            }`}
        >
          {isCameraOn ? "Stop Camera" : "Start Camera"}
        </button>
        <button
          onClick={toggleMic}
          className={`px-4 py-2 text-white rounded-lg ${isMicOn ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"
            }`}
        >
          {isMicOn ? "Mute Mic" : "Unmute Mic"}
        </button>
        <button
          onClick={handleLeave}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default Call;

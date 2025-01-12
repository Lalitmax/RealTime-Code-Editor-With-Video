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
  handleClick: () => void

};

type VideosProps = {
  appId: string; // Agora App ID
  channelName: string; // Channel Name
  token?: string | null; // Optional token for authentication
  onLeave?: () => void; // Callback for leaving the call
  onError?: (error: Error) => void; // Callback for handling errors
  handleClick: () => void
};

function Call({ appId, channelName, handleClick }: CallProps) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos appId={appId} channelName={channelName} handleClick={handleClick} />
    </AgoraRTCProvider>
  );
}

function Videos({
  appId,
  channelName,
  token = null,
  onLeave,
  handleClick,
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
  const handleLeave = () => {
    handleClick()
    // try {
    //   if (client) {

    //     await client.leave();
    //     if (onLeave) onLeave();
    //     else window.location.href="/"
    //   }
    // } catch (error) {
    //   if (onError) onError(error as Error);
    // }
  };

  if (isLoadingMic || isLoadingCam) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#00a3fe] rounded-md">
        <img src="https://i.pinimg.com/originals/9a/c5/44/9ac544b2ccea35627fb797462e390785.gif" alt="" />
      </div>
    );
  }

  if (micError || camError) {
    const errorMessage = micError
      ? `Error accessing microphone: ${micError.message}`
      : `Error accessing camera: ${camError?.message}`;

    if (onError) onError(new Error(errorMessage));

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 max-w-sm text-center">
          <h2 className="text-2xl font-extrabold text-red-600 mb-4">
            Camera or Device in Use
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Please ensure your camera or microphone is not being used by another application.
          </p>
          <button
            onClick={() => handleClick()}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>

    );
  }

  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      {/* Video Grid */}
      <div className="h-52 w-full rounded-md ">
        <div className="video rounded-md overflow-hidden h-52 w-full">
          <LocalVideoTrack
            track={localCameraTrack}
            play={true}
            style={{ borderRadius: 10 }}
            className="w-20 h-28 rounded-md"
          />
        </div>

        <div
          className={`flex pt-1 w-full items-center justify-between`}
        >

          {remoteUsers.map((user) => (

            <div key={user.uid} className="h-[7.5rem] w-[9.8rem] rounded-md overflow-hidden ">
              <RemoteUser user={user} key={user.uid} />
            </div>


          ))}
        </div>



      </div>



      {/* Controls */}
      <div className="flex justify-center space-x-4 mt-4 rounded-md bg-[#f7f7f7] p-2 border">
        <button
          onClick={toggleCamera}
          className={`w-40 h-12 flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-colors duration-200 ${isCameraOn ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
            }`}
        >
          {isCameraOn ? "Camera" : "Camera"}
        </button>
        <button
          onClick={toggleMic}
          className={`w-40 h-12 flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-colors duration-200 ${isMicOn ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
            }`}
        >
          {isMicOn ? "Mute" : "Unmute"}
        </button>
        <button
          onClick={handleLeave}
          className="w-40 h-12 flex items-center justify-center px-4 py-3 text-white font-semibold bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Leave
        </button>
      </div>

    </div>
  );
}

export default Call;

"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Call from "@/components/Call";
import { Dialog } from "@/components/Dialog";

type WidthProp = {
    width: number;
};

const SideRightBar: React.FC<WidthProp> = ({ width }) => {
    console.log("hello sidebar called")
    const [startVideo, setStartVideo] = useState(false);
    const [isCameraOn, setCameraOn] = useState(true);
    const [isMicOn, setMicOn] = useState(true);
    const [channelName, setChannelName] = useState(localStorage.getItem("roomName"));
    const [isOpen, setIsOpen] = useState(false);


    const handleToggleCamera = () => setCameraOn((prev) => !prev);
    const handleToggleMic = () => setMicOn((prev) => !prev);
    const handleLeave = () => {
        setStartVideo(false);
        // Additional leave logic if needed
    };

    const handleClick = () => {
        setChannelName(localStorage.getItem("roomName"));

        if (!localStorage.getItem("roomName")) {
            setIsOpen(prev => !prev);
        } else {
            setStartVideo((prev) => !prev);
            setIsOpen(false);
        }


    };

    const content = (
        <div className="w-64 text-sm text-gray-500">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                <h3 className="font-semibold text-gray-900">First Start Share</h3>
            </div>
            <div className="px-3 py-2">
                <p>
                    Create Room  Then start video sharing
                </p>
            </div>
        </div>
    );




    return (
        <div className="h-full bg-white dark:bg-gray-800 rounded-md border overflow-hidden">
            {/* Video Section */}
            <div className="h-full bg-white dark:bg-gray-800 rounded-md p-1 flex flex-col items-center">
                {startVideo && channelName ? (

                    <Call
                        appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                        channelName={channelName}
                        isCameraOn={isCameraOn}
                        isMicOn={isMicOn}
                        onToggleCamera={handleToggleCamera}
                        onToggleMic={handleToggleMic}
                        onLeave={handleLeave}
                        handleClick={handleClick}
                    />

                ) : (
                    <div className="flex flex-col justify-between h-full">

                        <div className={`h-full bg-white dark:bg-gray-800 rounded-md p-1`}>
                            <img
                                className="h-auto w-full rounded-lg"
                                src="https://shorturl.at/7kyBW"
                                alt=""
                            />

                            <div
                                className={`grid grid-cols-2 md:grid-cols-2 gap-1 pt-1 h-[calc(100%-${width})] overflow-hidden`}
                            >
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://shorturl.at/WeHfw"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://shorturl.at/WeHfw"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://shorturl.at/WeHfw"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://shorturl.at/WeHfw"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center space-x-4 mt-4 p-2 relative  rounded-md bg-[#f7f7f7] border">
                            {!startVideo &&
                                <button
                                    onClick={handleClick}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Share Video
                                </button>
                            }

                            {isOpen && (
                                <div
                                    className={`z-10 bg-white border border-gray-200 shadow-lg rounded p-1 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2`}
                                >
                                    {content}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default SideRightBar;

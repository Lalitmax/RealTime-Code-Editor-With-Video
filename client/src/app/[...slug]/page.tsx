"use client";
import dynamic from 'next/dynamic';

const SideLeftBar = dynamic(() => import('@/components/SideLeftBar'), { ssr: false });
const SideRightBar = dynamic(() => import('@/components/SideRightBar'), { ssr: false });
const TextEditor = dynamic(() => import('@/components/TextEditor'), { ssr: false });
const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });
import socket from "@/lib/socket";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation';

const Home = () => {


  const params = useParams(); // Captures parameters like [...slug]

  const [leftBarWidthCounter, setLeftBarWidthCounter] = useState(100);
  const [rightBarWidthCounter, setRightBarWidthCounter] = useState(100);
  const [chat, setChat] = useState("");
  const checkWidthLeftBar = (size: number): void => {
    setLeftBarWidthCounter(size); // Set the percentage width
  }
  const checkWidthRighttBar = (size: number): void => {
    setRightBarWidthCounter(size); // Set the percentage width
  }



  useEffect(() => {
    const paramsRoomName = params.slug?.[0];

    // Ensure `paramsRoomName` exists before proceeding
    if (!paramsRoomName) {
      console.log("No paramsRoomName found!");
      return;
    }

    // Only update `localStorage` if necessary
    const storedRoomName = localStorage.getItem('roomName');
    if (paramsRoomName.length === 36) {
      socket.emit("joinRoom", paramsRoomName);
      localStorage.setItem("roomName", paramsRoomName);
    }

  }, [params, socket]);


  return (<>
    <div className="h-full w-full pt-[68px] fixed">
 
      <ResizablePanelGroup direction="horizontal" className="px-1 ">

        <SideLeftBar width={leftBarWidthCounter} />

        <ResizablePanel defaultSize={67} className="mb-1 rounded-md ml-[1px] mr-[1px] relative">

          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <TextEditor />
            </ResizablePanel>


            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={0} minSize={6}  >
              <Terminal></Terminal>
            </ResizablePanel>

          </ResizablePanelGroup>


        </ResizablePanel>
        <ResizableHandle withHandle />


        <ResizablePanel onResize={(size) => checkWidthRighttBar(size)} defaultSize={20}
          className="mb-1 rounded-md flex-col justify-between items-center ml-[1px]">
          <SideRightBar width={rightBarWidthCounter} />
        </ResizablePanel>



      </ResizablePanelGroup>
    </div >
  </>)
}

export default Home;






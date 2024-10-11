"use client";
import dynamic from 'next/dynamic';

const SideLeftBar = dynamic(() => import('@/components/SideLeftBar'), { ssr: false });
const SideRightBar = dynamic(() => import('@/components/SideRightBar'), { ssr: false });
const TextEditor = dynamic(() => import('@/components/TextEditor'), { ssr: false });
const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
  const [leftBarWidthCounter, setLeftBarWidthCounter] = useState(100);
  const [rightBarWidthCounter, setRightBarWidthCounter] = useState(100);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(15);
  const checkWidthLeftBar = (size: number): void => {
    setLeftBarWidthCounter(size); // Set the percentage width
  }
  const checkWidthRighttBar = (size: number): void => {
    setRightBarWidthCounter(size); // Set the percentage width
  }



  return (<>
    <div className="h-full w-full pt-[68px] fixed">
      {/* <SideLeftBar divRef={divRef} size= {size}/> */}

      <ResizablePanelGroup direction="horizontal" className="px-1 ">

        {/* Sidebar */}
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






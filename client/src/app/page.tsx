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
   const checkWidthLeftBar = (size: number): void => {
    setLeftBarWidthCounter(size);
  }
  const checkWidthRighttBar = (size: number): void => {
    setRightBarWidthCounter(size);
  }



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
            <ResizablePanel defaultSize={5} minSize={5}  >
              <Terminal></Terminal>
            </ResizablePanel>

          </ResizablePanelGroup>


        </ResizablePanel>

        <div className="mb-1 rounded-md flex-col justify-between items-center ml-[1px] w-[21rem]">
          <SideRightBar width={rightBarWidthCounter} />
        </div>



      </ResizablePanelGroup>
    </div >
  </>)
}

export default Home;






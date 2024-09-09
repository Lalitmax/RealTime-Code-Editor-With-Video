"use client";
import SideLeftBar from "@/components/SideLeftBar";
import SideRightBar from "@/components/SideRightBar";
import TextEditor from "@/components/TextEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Terminal from "@/components/Terminal";
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

      <ResizablePanelGroup
        direction="horizontal" className="px-1 "
      >
        <ResizablePanel minSize={4} maxSize={15} onResize={(size) => checkWidthLeftBar(size)} className="mb-1 rounded-md mr-[1px]">
          <SideLeftBar width={leftBarWidthCounter} />
        </ResizablePanel>
        <ResizableHandle />
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






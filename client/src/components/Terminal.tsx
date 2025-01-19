import React, { useState } from 'react'
import { PiTerminalBold } from "react-icons/pi";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ShadCnButton } from './ui/shadcnbutton';
import Loader  from '@/components/Loader';


const Terminal = () => {
    const [isCompiled, setIsCompiled]= useState(false);

    function handleClick() {
        setIsCompiled(true)
        setTimeout(() => {
            setIsCompiled(false)
        }, 1000);
    }
    return (
        <>
            <div className=" absolute  pl-2 h-10 pr-1 dark:border-gray-700 flex items-center justify-between    w-full  rounded-b-md bg-[#f7f7f7]  " >
                <PiTerminalBold className='text-2xl text-gray-600' /><ShadCnButton onClick={handleClick} color="#3076f5"   > {isCompiled ? <Loader/> : "Run"}</ShadCnButton>
            </div>


            <div className=" h-full w-full block px-4 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none pt-10">

                <ResizablePanelGroup
                    direction="horizontal"
                // className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
                >
                    <ResizablePanel maxSize={100}>
                        <textarea
                            id="editor"
                            className=" h-full w-full block px-2 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
                            placeholder="Input"
                            required
                        ></textarea>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel maxSize={100}>
                        <textarea
                            id="editor"
                            className=" h-full w-full block px-4 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
                            placeholder="Output"
                            required
                            readOnly
                        ></textarea>
                    </ResizablePanel>
                </ResizablePanelGroup>

            </div>





        </>)
}

export default Terminal
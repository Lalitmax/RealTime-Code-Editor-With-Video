import React from 'react'
import { PiTerminalBold } from "react-icons/pi";

import Image from 'next/image'
const Terminal = () => {
    return (
        <>
            <div className=" absolute  pl-2 h-10 pr-2 dark:border-gray-700 flex items-center justify-between    w-full  rounded-b-md bg-[#f7f7f7]  " >
            <PiTerminalBold  className='text-2xl text-gray-600' />Terminal
            </div>
            <textarea
                id="editor"
                className=" h-full w-full block px-4 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none pt-12"
                placeholder="Input"
                required
            ></textarea>


        </>)
}

export default Terminal
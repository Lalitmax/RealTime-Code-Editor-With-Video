'use client'
import React, { useState } from 'react'

type SideLeftBarProps = {
    width: number;
}

const SideLeftBar: React.FC<SideLeftBarProps> = ({ width }) => {
    const [sideBarHide, setSideBarHide] = useState(false)

    return (
        <div
            className={`h-full ${sideBarHide ? 'w-0' : `w-${width}`} transition-all duration-300 pl-4 pr-6 pt-8 pb-4 flex justify-start items-start bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 shadow-lg`}
        >
            <div className="flex flex-col w-full ">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 w-full flex items-center justify-center ">
                    Hi ✋
                </h1>
                 
            </div>
        </div>
    )
}

export default SideLeftBar

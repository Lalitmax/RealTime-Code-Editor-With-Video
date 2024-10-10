'use client'
import React, { useRef, useState } from 'react'
import { FaCodeMerge } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { FaAnglesRight } from "react-icons/fa6";
import socket from '@/lib/socket';
import { JoinRoom } from './JoinRoom';


type SideLeftBarProps = {
    width: number;
}

const SideLeftBar: React.FC<SideLeftBarProps> = ({ width }) => {
    const [sideBarHide, setSideBarHide] = useState(true)

    return (
 
        <div className={`h-full pl-3 pr-6 pt-10 pb-4 flex mr-[2px]  justify-center   overflow-y-auto bg-white dark:bg-gray-800  rounded-md border `}>
            <ul>

                <JoinRoom />

            </ul>

        </div >
    )
}

export default SideLeftBar
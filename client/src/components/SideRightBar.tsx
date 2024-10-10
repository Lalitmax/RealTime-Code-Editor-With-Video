import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image';

type WidthProp = {
    width: number;
}

const SideRightBar: React.FC<WidthProp> = ({ width }) => {

    return (
        <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 rounded-md overflow-hidden border">
            <div className={`h-[clac(100%-20%)] bg-white dark:bg-gray-800  rounded-md p-1`}>
                <Image className="h-auto w-full rounded-lg" src="https://shorturl.at/7kyBW" alt="" />

            </div>
            <div className={`grid grid-cols-2 md:grid-cols-2 gap-1 p-1  h-[calc(100%-${width})] overflow-hidden`}>
                <div>
                    <Image className="h-auto max-w-full rounded-lg" src="https://shorturl.at/WeHfw" alt="" />
                </div>
                <div>
                    <Image className="h-auto max-w-full rounded-lg" src="https://shorturl.at/WeHfw" alt="" />
                </div>
                <div>

                    <Image className="h-auto max-w-full rounded-lg" src="https://shorturl.at/WeHfw" alt="" />
                </div>
                <div>
                    <Image className="h-auto max-w-full rounded-lg" src="https://shorturl.at/WeHfw" alt="" />
                </div>
                <div className="col-span-1 justify-center items-end w-full">
                    <Image className="h-auto max-w-full rounded-lg" src="https://shorturl.at/WeHfw" alt="" />
                </div>

            </div>
        </div>
    )
}

export default SideRightBar
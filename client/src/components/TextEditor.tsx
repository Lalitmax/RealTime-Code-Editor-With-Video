'use client'
import React, { useEffect } from 'react'
import { FaCode } from "react-icons/fa6";

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css'
import 'codemirror/addon/edit/matchbrackets'; // Import bracket matching
import 'codemirror/addon/edit/closebrackets'; // Import auto-closing brackets

import 'codemirror/mode/javascript/javascript'; // Import the JavaScript mode

const TextEditor = () => {
    useEffect(() => {
        const init = async () => {
            const textarea = document.querySelector("#editor") as HTMLTextAreaElement | null;

            if (textarea) {
                const editor = CodeMirror.fromTextArea(textarea, {
                    mode: { name: 'javascript', json: true },
                    // theme: 'xq-light',
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    lineNumbers: true

                })
                editor.setSize(null, "100%")
            }

        }
        init();

    }, [])

    return (
        <>
            <div className="z-10 absolute pl-2  p-r-4 h-10  dark:border-gray-700 flex items-center justify-between rounded-t-md bg-[#f7f7f7]  border-[1px] w-full " >
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                    <FaCode className=' text-gray-600 text-xl' />
                </div>
                <button type="button" data-tooltip-target="tooltip-fullscreen" className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5" />
                    </svg>
                    <span className="sr-only">Full screen</span>
                </button>
                <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Show full screen
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
            <textarea
                id="editor"
                className="h-full w-full block px-4  text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none pt-12 text-3xl"
                placeholder="Write here code..."
                required
            ></textarea>

        </>)
}

export default TextEditor
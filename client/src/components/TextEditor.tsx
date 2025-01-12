'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaCode } from 'react-icons/fa6';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import socket from '@/lib/socket';
import { v4 as uuidv4 } from 'uuid';

interface t {
    chats: string,
    isCollab: boolean

  }

const TextEditor = () => {
  const [clientId] = useState<string>(uuidv4());
  const editorRef = useRef<CodeMirror.Editor | null>(null);

  

  const handleNewJoin = (payload: t) => {
    const chats = payload.chats;
    if (editorRef.current) {
      const doc = editorRef.current.getDoc();
      if (payload.chats && payload.chats.length !== 0) {
        doc.setValue(payload.chats);
      }
    }
  };

  // Handle chat updates
  const handleChat = (payload: { chat: string; clientId: string; }) => {
    if (payload.clientId !== clientId && editorRef.current) {
      const doc = editorRef.current.getDoc();
      if (payload.chat && typeof payload.chat === 'string') {
        doc.setValue(payload.chat);
      } else {
        console.error('Invalid chat payload:', payload);
      }
    }
  };

  useEffect(() => {

    // Setup socket listeners
    socket.on("chat", handleChat);
    socket.on("newJoin", handleNewJoin);


    const roomName = localStorage.getItem("roomName") || clientId;
    socket.emit("joinRoom", roomName);

    return () => {
      socket.off("chat", handleChat);
      socket.off("newJoin", handleNewJoin);
    };
  }, [clientId]);



  useEffect(() => {
    const init = () => {
      const textarea = document.querySelector('#editor') as HTMLTextAreaElement | null;

      if (textarea) {
        const editor = CodeMirror.fromTextArea(textarea, {
          mode: { name: 'javascript', json: true },
          autoCloseBrackets: true,
          matchBrackets: true,
          lineNumbers: true,
          theme: 'xq-light',
        });

        editorRef.current = editor;

        const savedContent = localStorage.getItem('chats');
        if (savedContent && editorRef.current && savedContent.length > 1) {
          editorRef.current.setValue(savedContent);
        }

        editor.setSize(null, '100%');

        editorRef.current.on('change', (instance, changes) => {
          const { origin } = changes;
          const code = instance.getValue();

          if (origin !== 'setValue') {
            console.log(`Updated Code: ${code}`);
            if (code) {
              localStorage.setItem('chats', code);
            }
            socket.emit('chat', {
              chat: code,
              roomName: localStorage.getItem('roomName'),
              clientId,
            });
          }
        });
      }
    };

    init();
  }, []);

  return (
    <>
      <div className="z-10 absolute pl-2 p-r-4 h-10 dark:border-gray-700 flex items-center justify-between rounded-t-md bg-[#f7f7f7] border-[1px] w-full">
        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
          <FaCode className="text-gray-600 text-xl" />
        </div>
        <button
          type="button"
          data-tooltip-target="tooltip-fullscreen"
          className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 19 19"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
            />
          </svg>
          <span className="sr-only">Full screen</span>
        </button>
      </div>
      <textarea
        id="editor"
        className="h-full w-full block px-4 text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none pt-12 text-3xl"
        placeholder="Write here code..."
        required
      ></textarea>
    </>
  );
};

export default TextEditor;

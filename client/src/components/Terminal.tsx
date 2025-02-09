import React, { useRef, useState } from "react";
import { PiTerminalBold } from "react-icons/pi";
import axios from "axios";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ShadCnButton } from "./ui/shadcnbutton";
import Loader from "@/components/Loader";

interface TerminalProps {
    langMode: string;
}

const Terminal: React.FC<TerminalProps> = ({ langMode }) => {
    const [isCompiled, setIsCompiled] = useState(false);
    const [output, setOutput] = useState<string>(""); // State to store output
    const inputRef = useRef<HTMLTextAreaElement>(null); // Ref for input textarea

    const languageMap = new Map<string, string>([
        ["Java", "java"],
        ["C++", "cpp17"],
        ["JavaScript", "nodejs"],
        ["Python", "python3"],
        ["C", "c"],
    ]);

    const langVersionMap = new Map<string, string>([
        ["Java", "3"],
        ["C++", "0"],
        ["JavaScript", "4"],
        ["Python", "3"],
        ["C", "0"],
    ]);

    const executeCode = async (inputPara: string, code: string, language: string, versionIndex: string) => {
        try {
            const response = await axios.post("http://localhost:3005/execute", {
                clientId: "8d0a8035f4efbeed23e2038f421d056f", // Add your client ID here
                clientSecret: "795bf1f4c00bc37104f0acc0be428fcda070e672f8456ffb32894817ad29e53", // Add your client secret here
                script: code,
                stdin: inputPara,
                language,
                versionIndex,
                compileOnly: false,
            });

            setOutput(response.data.output || "No output");
        } catch (error) {
            console.error("Execution error:", error);
            setOutput("Error executing code");
        }
    };

    const handleClick = async () => {
        setIsCompiled(true);

        const inputCode = inputRef.current?.value || "";
        const storedCode = localStorage.getItem("chats") || "// No code found";

        const selectedLanguage = languageMap.get(langMode) || 'java';
        const selectedVersion = langVersionMap.get(langMode) || "3"; // Default version

        await executeCode(inputCode, storedCode, selectedLanguage, selectedVersion);
        setIsCompiled(false);
    };

    return (
        <>
            {/* Header */}
            <div className="absolute pl-2 h-10 pr-1 dark:border-gray-700 flex items-center justify-between w-full rounded-b-md bg-[#f7f7f7]">
                <PiTerminalBold className="text-2xl text-gray-600" />
                <ShadCnButton onClick={handleClick} color="#3076f5">
                    {isCompiled ? <Loader /> : "Run"}
                </ShadCnButton>
            </div>

            {/* Terminal UI */}
            <div className="h-full w-full block px-4 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none pt-10">
                <ResizablePanelGroup direction="horizontal">
                    {/* Input Panel */}
                    <ResizablePanel maxSize={100}>
                        <textarea
                            ref={inputRef}
                            id="editor"
                            className="h-full w-full block px-2 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
                            placeholder="Input"
                            required
                        />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    
                    {/* Output Panel */}
                    <ResizablePanel maxSize={100}>
                        <textarea
                            id="output"
                            value={output} // Display the output here
                            className="h-full w-full block px-4 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
                            placeholder="Output"
                            required
                            readOnly
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    );
};

export default Terminal;

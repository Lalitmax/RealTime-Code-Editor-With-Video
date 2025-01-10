import { useEffect, useState } from "react";
import { Copy, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdCheckmark } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";

import socket from "@/lib/socket";


interface t {
  chats: string,
  isCollab: boolean

}


export function CodeShareLink() {
  const [shareCount, setShareCount] = useState(0);
  const [shareClicked, setShareClicked] = useState(false);

  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState("Start Share");
  const [shareLink, setShareLink] = useState<string>("");

  const handleShare = () => {
    if (share === "Start Share") {
      const roomName = uuidv4();
      const newUrl = `https://codemax-demo.vercel.app/${roomName}`;

      // Update local storage and URL 
      localStorage.setItem("roomName", roomName);
      localStorage.setItem("isSharing", "true");
      localStorage.setItem("shareLink", newUrl);
      window.history.pushState(null, "", newUrl);
      const tempChats = localStorage.getItem("chats");
      // Emit socket events
      socket.emit("joinRoom", roomName);
      socket.emit("chat", {
        chat: tempChats,
        roomName,
      });

      setShareLink(newUrl);
      setShare("Stop Share");
    } else {
      
      window.history.pushState(null, "", "/");
      setTimeout(() => {
        const roomName = localStorage.getItem("roomName");

      if (roomName) {
        socket.emit('leaveRoom', roomName);
      }
      setShareCount(0);

      localStorage.removeItem("isSharing");
      localStorage.removeItem("roomName");
      localStorage.removeItem("shareLink");

      setShareLink("");
      setShare("Start Share");
      }, 100);
    }

  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  useEffect(() => {
    const savedIsSharing = localStorage.getItem("isSharing");
    const savedShareLink = localStorage.getItem("shareLink");

    if (savedIsSharing === "true" && savedShareLink) {
      setShare("Stop Share");
      setShareLink(savedShareLink);
      const currentUrl = window.location.href;
      if (currentUrl.length != "http://localhost:3000/4604f366-6791-495f-9002-e42a3a88cf3b".length) {

        const roomName = localStorage.getItem("roomName");
        if (roomName) {
          socket.emit("leaveRoom", roomName);  // if user want to leav the room
        }

        // Clear local storage and reset state
        localStorage.removeItem("isSharing");
        localStorage.removeItem("roomName");
        localStorage.removeItem("shareLink");
        setShareCount(0);


        window.history.pushState(null, "", "/");

        setShareLink("");
        setShare("Start Share");
      }

      const roomName = localStorage.getItem("roomName");
      if (roomName) {
        socket.emit("joinRoom", roomName);
      }
    }

  }, []);

  useEffect(() => {

    socket.on("userJoined", (noOfJoinedUser) => {
      setShareCount(noOfJoinedUser - 1);
    });

    socket.on("userLeft", (noOfJoinedUser) => {
      setShareCount(noOfJoinedUser - 1);

    });

    socket.on("newJoin", (payload: t) => {
      const currentUrl = window.location.href;
      if (payload.isCollab == true) {
        localStorage.setItem("isSharing", "true");
        localStorage.setItem("isCollab", "true");
        localStorage.setItem("shareLink", currentUrl);
        setShareLink(currentUrl);
        setShare("Stop Share");



      }


    })

    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("newJoin");
    };
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full relative">
          Share
          {shareCount > 0 && (
            <span className="absolute -bottom-2 -right-2 text-xs bg-green-500 text-white rounded-full px-[7px] py-[2px]">
              {shareCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        {shareLink && (
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" value={shareLink} readOnly />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
              {copied ? <IoMdCheckmark className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
        <Button
          className={`mt-4 w-full ${share === "Stop Share" ? "bg-red-500" : "bg-green-500"}`}
          onClick={handleShare}
        >
          {share}
        </Button>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

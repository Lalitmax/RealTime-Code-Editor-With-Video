import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import socket from "@/lib/socket";
import { useAppDispatch } from "@/lib/store/hooks";
import { setRoomName } from "@/lib/store/slices/socket/joinRoomSlice";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
interface ChildProps {
    onButtonClick: () => void; // Function that takes no arguments and returns void
}

export function JoinRoom() {

    
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();

    const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };
      
    const joinRoomSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setRoomName({roomName : name}))
        socket.emit("joinRoom", name);
    }


 
    return (
        <Dialog>
            <DialogTrigger asChild>
            <button className="flex items-center justify-between px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium mb-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m3-10H18M7 16h10m-3-11v12" />
                    </svg>
                    <span className="ml-2">Join</span>
                </div>
            </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={joinRoomSubmit} >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Join Room

                            </Label>
                            <Input
                                id="name"
                                onChange={handleRoomNameChange}
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" >Join Now</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

import { useState } from "react";
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
import ButtonFlow from './ButtonFlow';

export function CodeShareLink() {
  const [copied, setCopied] = useState(false);
  const link = "https://ui.shadcn.com/docs/installation";

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => console.error('Failed to copy!', err));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Share</Button>
        {/* <ButtonFlow></ButtonFlow> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={link}
              readOnly
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">
              {copied ? 'Copied' : 'Copy'} {/* This text is for screen readers only */}
            </span>
            {copied ? <IoMdCheckmark className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
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

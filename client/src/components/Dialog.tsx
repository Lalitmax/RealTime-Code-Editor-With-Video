import { useState } from "react";

interface PopoverProps {
  content: React.ReactNode;
  placement: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

export const Dialog = ({ content, placement, children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const getPopoverPosition = () => {
    switch (placement) {
      case "top":
        return " absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "right":
        return "top-1/2 left-full transform -translate-y-1/2 ml-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "top-1/2 right-full transform -translate-y-1/2 mr-2";
      default:
        return "";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={togglePopover}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {children}
      </button>
      
    </div>
  );
};

 
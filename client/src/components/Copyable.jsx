import { useEffect, useState } from "react";
import { MdCopyAll } from "react-icons/md";
import { displayAddress } from "../utils";

const Copyable = ({ string, position = "left" }) => {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied]);

  const handleCopy = (event) => {
    event.stopPropagation();
    if (isCopied) return;
    navigator.clipboard.writeText(string);
    setCopied(true);
  };

  return (
    <div
      onClick={handleCopy}
      className="flex justify-between gap-2 items-center text-zinc-500 hover:text-white cursor-pointer relative group"
    >
      <div>{displayAddress(string)}</div>
      <MdCopyAll className="text-2xl" />
      <div
        className={`hidden group-hover:flex absolute whitespace-nowrap font-bold italic text-sm transform -translate-y-1/2 top-1/2 ${
          position === "right" ? "left-full ml-2" : "right-8"
        }`}
      >
        {isCopied ? "Copied!" : "Copy to clipboard!"}
      </div>
    </div>
  );
};

export default Copyable;

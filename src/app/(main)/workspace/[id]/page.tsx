"use client";

import ChatView from "@/components/custom/chatView";
import CodeView from "@/components/custom/codeView";
import { useState } from "react";

export default function WorkspacePage() {
  // state
  const [isFullSize, setIsFullSize] = useState<boolean>(false);

  // actions
  const onChangeFullSize = () => {
    setIsFullSize((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-3 gap-7 py-3 h-full min-w-[900px] overflow-x-auto">
      <div className={`${isFullSize && "hidden"} col-span-1`}>
        <ChatView />
      </div>
      <div className="col-span-2">
        <CodeView isFullSize={isFullSize} onChangeFullSize={onChangeFullSize} />
      </div>
    </div>
  );
}

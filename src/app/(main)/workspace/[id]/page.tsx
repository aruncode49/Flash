"use client";

import ChatView from "@/components/custom/chatView";
import CodeView from "@/components/custom/codeView";
import { useSidebar } from "@/components/ui/sidebar";
import { userAtom } from "@/lib/globalAtoms";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";

export default function WorkspacePage() {
  // hooks
  const { toggleSidebar } = useSidebar();

  // state
  const [isFullSize, setIsFullSize] = useState<boolean>(false);

  // atoms
  const user = useAtomValue(userAtom);

  // actions
  const onChangeFullSize = () => {
    setIsFullSize((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-3 gap-5 py-3 h-full min-w-[900px] overflow-x-auto">
      <div className={`${isFullSize && "hidden"} col-span-1 flex gap-3`}>
        <div className="flex items-end">
          {user && user?.picture && (
            <Image
              src={user.picture}
              alt="User Image"
              width={100}
              height={100}
              title="User Profile"
              className="rounded-full cursor-pointer hover:opacity-80"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <ChatView />
      </div>
      <div className="col-span-2">
        <CodeView isFullSize={isFullSize} onChangeFullSize={onChangeFullSize} />
      </div>
    </div>
  );
}

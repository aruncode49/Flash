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
    <div className="flex w-full gap-5 py-3 h-full overflow-x-auto">
      <div
        className={`${isFullSize && "hidden"} flex gap-2 basis-1/3 min-w-[25rem]`}
      >
        <div className="md:flex items-end min-w-[1.5rem] max-w-[1.5rem] hidden">
          {user && user?.picture && (
            <Image
              src={user.picture}
              alt="User Image"
              width={30}
              height={30}
              title="User Profile"
              className="rounded-full cursor-pointer hover:opacity-80"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <ChatView />
      </div>
      <div className="w-full min-w-[50rem]">
        <CodeView isFullSize={isFullSize} onChangeFullSize={onChangeFullSize} />
      </div>
    </div>
  );
}

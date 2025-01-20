"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useAtom, useAtomValue } from "jotai";
import { promptAtom, userAtom } from "@/lib/globalAtoms";
import { useEffect } from "react";
import Image from "next/image";
import PromptInput from "./promptInput";

export default function ChatView() {
  // hooks
  const { id } = useParams();
  const convex = useConvex();

  // atoms
  const [promptMessage, setPromptMessage] = useAtom(promptAtom);
  const user = useAtomValue(userAtom);

  // actions
  const onGetWorkspace = async () => {
    const workspace = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id as Id<"workspace">,
    });
    if (workspace) {
      setPromptMessage(workspace.messages);
    }
  };

  // effects
  useEffect(() => {
    id && onGetWorkspace();
  }, [id]);

  return (
    <div className="z-50 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {promptMessage.map((message, index) => (
          <div
            key={index}
            className="px-3 py-2 bg-neutral-700 mb-2 rounded-lg flex items-center gap-2 text-xs font-normal"
          >
            {message.role === "user" && user?.picture && (
              <Image
                src={user.picture}
                alt="User Image"
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            {message.message}
          </div>
        ))}
      </div>
      <PromptInput />
    </div>
  );
}

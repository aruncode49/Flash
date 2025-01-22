"use client";

import { IWorkspaces } from "@/interfaces/workspaces";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/globalAtoms";
import { Id } from "../../../convex/_generated/dataModel";
import { FaTrashAlt } from "react-icons/fa";
import { Loader } from "lucide-react";

export default function ChatHistory() {
  // hooks
  const convex = useConvex();

  // atoms
  const user = useAtomValue(userAtom);

  // states
  const [allWorkspaces, setAllWorkspaces] = useState<IWorkspaces[]>([]);
  const [loading, setLoading] = useState(false);

  // actions
  const onFetchAllWorkspaces = async () => {
    setLoading(true);
    const workspaces = await convex.query(api.workspace.getAllWorkspaces, {
      userId: user?.id as Id<"users">,
    });
    if (workspaces?.length > 0) {
      setAllWorkspaces(workspaces as IWorkspaces[]);
    }
    setLoading(false);
  };

  // effects
  useEffect(() => {
    if (user?.id) {
      onFetchAllWorkspaces();
    }
  }, [user]);

  return (
    <div>
      <h2 className="font-medium">Your Chats</h2>
      {loading ? (
        <Loader className="animate-spin size-5 mt-4 mx-auto" />
      ) : allWorkspaces.length > 0 ? (
        <div className="mt-3 flex flex-col gap-1">
          {allWorkspaces.map((workspace, index) => (
            <div
              className="text-xs p-1 px-2 text-neutral-300 rounded-sm hover:bg-neutral-800 hover:text-white cursor-pointer flex items-center justify-between gap-1"
              key={index}
              title={workspace.messages[0].message}
            >
              <p className="line-clamp-1 capitalize">
                {`${index + 1}. `} {workspace.messages[0].message}
              </p>
              <span title="Delete">
                <FaTrashAlt className="hover:text-red-500 hover:scale-110" />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-xs text-neutral-400">
          No Chat Found!
        </p>
      )}
    </div>
  );
}

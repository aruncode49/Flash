"use client";

import { IWorkspaces } from "@/interfaces/workspaces";
import { useConvex, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/globalAtoms";
import { Id } from "../../../convex/_generated/dataModel";
import { FaTrashAlt } from "react-icons/fa";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import DeleteChatDialog from "./deleteChatDialog";
import { toast } from "sonner";

type TChatData = {
  id: Id<"workspace">;
  name: string;
};

export default function ChatHistory() {
  // hooks
  const convex = useConvex();
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const onDeleteWorkspaceChat = useMutation(api.workspace.deleteWorkspaceChat);
  const { id } = useParams();

  // atoms
  const user = useAtomValue(userAtom);

  // states
  const [allWorkspaces, setAllWorkspaces] = useState<IWorkspaces[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [chatData, setChatData] = useState<TChatData | undefined>(undefined);
  const [chatDeleting, setChatDeleting] = useState(false);

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

  const onDeleteWorkspace = async (
    workspaceId: Id<"workspace"> | undefined
  ) => {
    if (!workspaceId) return;
    setChatDeleting(true);
    await onDeleteWorkspaceChat({ id: workspaceId });

    // update all workspace locally
    setAllWorkspaces((prev) =>
      prev.filter((workspace) => workspace._id !== workspaceId)
    );
    setChatDeleting(false);
    toast.success("Chat deleted successfully!");
    toggleSidebar();

    // navigate to home page if user deleting the opening workspace
    if (id) {
      if (id === workspaceId) {
        router.push("/");
      }
    }
  };

  const onClickDeleteChat = (data: TChatData) => {
    setChatData(data);
    setDialogOpen(true);
  };

  const onNavigateToWorkspace = (id: string) => {
    router.push(`/workspace/${id}`);
    toggleSidebar();
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
              className="text-sm py-1 px-2 text-neutral-300 rounded-sm hover:bg-neutral-800 hover:text-white cursor-pointer flex items-center justify-between gap-1"
              key={index}
              title={workspace.messages[0].message}
            >
              <p
                onClick={() => onNavigateToWorkspace(workspace._id)}
                className="line-clamp-1 capitalize w-full"
              >
                {`${index + 1}. `} {workspace.messages[0].message}
              </p>
              <span
                onClick={() =>
                  onClickDeleteChat({
                    id: workspace._id,
                    name: workspace.messages[0].message,
                  })
                }
                className="p-1 hover:text-red-500"
                title="Delete"
              >
                {chatDeleting && workspace._id === chatData?.id ? (
                  <Loader className="animate-spin size-3" />
                ) : (
                  <FaTrashAlt />
                )}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-xs text-neutral-400">
          No Chat Found!
        </p>
      )}

      {/* Delete Chat Dialog */}
      <DeleteChatDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        chatName={chatData?.name}
        onDelete={() => onDeleteWorkspace(chatData?.id)}
      />
    </div>
  );
}

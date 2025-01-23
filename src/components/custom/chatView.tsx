"use client";

import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useAtom } from "jotai";
import { promptAtom, userAtom } from "@/lib/globalAtoms";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PromptInput from "./promptInput";
import { prompt } from "@/constants/prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Loader } from "lucide-react";
import { countToken } from "@/utils/countToken";
import { toast } from "sonner";

export default function ChatView() {
  // hooks
  const { id } = useParams();
  const convex = useConvex();
  const onUpdateWorkspaceChat = useMutation(api.workspace.updateWorkspace);
  const onUpdateUserToken = useMutation(api.users.updateUserToken);

  // atoms
  const [promptMessage, setPromptMessage] = useAtom(promptAtom);
  const [user, setUser] = useAtom(userAtom);

  // state
  const [isGeneratingChat, setIsGeneratingChat] = useState<boolean>(false);
  const [isFetchingChats, setIsFetchingChats] = useState<boolean>(false);

  // refs
  const isGenerating = useRef<boolean>(false);

  // actions
  const onGetWorkspace = async () => {
    setIsFetchingChats(true);
    const workspace = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id as Id<"workspace">,
    });
    if (workspace) {
      setPromptMessage(workspace.messages);
    }
    setIsFetchingChats(false);
  };

  const onGenerateAIResponse = async () => {
    if (isGenerating.current) return; // Prevent multiple executions
    isGenerating.current = true;

    setIsGeneratingChat(true);
    const _prompt = JSON.stringify(promptMessage) + prompt.chatPrompt;
    const response = await axios.post("/api/ai-chat", {
      prompt: _prompt,
    });
    if (response.data.success && id && user) {
      const _promptMessage = promptMessage
        .map((item) => {
          return { ...item };
        })
        .concat({ role: "ai", message: response.data.data });

      setPromptMessage(_promptMessage);

      // Get token length and update in user db
      const token =
        user?.token - countToken(JSON.stringify(response.data.data));

      // update user object
      setUser({
        ...user,
        token: token,
      });

      // update user token in db
      await onUpdateUserToken({
        token: token,
        userId: user.id as Id<"users">,
      });

      // update workspace chat
      await onUpdateWorkspaceChat({
        messages: _promptMessage,
        workspaceId: id as Id<"workspace">,
      });
    } else {
      toast.error(response.data.errorMessage);
    }

    setIsGeneratingChat(false);
    isGenerating.current = false;
  };

  // effects
  useEffect(() => {
    // Ensure id exists and is not empty
    if (id) {
      onGetWorkspace(); // Fetch workspace data
    }
  }, [id]); // Only run when id changes

  useEffect(() => {
    if (promptMessage.length > 0) {
      const role = promptMessage[promptMessage.length - 1].role;
      if (role === "user") {
        onGenerateAIResponse(); // Generate AI response if the user's message is the latest
      }
    }
  }, [promptMessage]); // Only run when promptMessage changes

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-5rem)] w-full">
      <div
        className="flex-1 overflow-y-scroll scrollbar-hide rounded-sm"
        style={{
          fontFamily: "Arial",
        }}
      >
        {promptMessage.map((message, index) => (
          <div
            key={index}
            className="px-3 py-2 bg-neutral-700 mb-2 rounded-sm flex items-start gap-2 text-sm font-normal"
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
            <ReactMarkdown className="leading-5">{`${message.role === "ai" ? "⚡" : ""}${message.message}`}</ReactMarkdown>
          </div>
        ))}

        {/* Generating Loader */}
        {(isGeneratingChat || isFetchingChats) && (
          <Loader className="animate-spin size-5 text-neutral-300 mx-auto my-2" />
        )}
      </div>
      <div className="sticky bottom-0 z-10 mt-2">
        <PromptInput />
      </div>
    </div>
  );
}

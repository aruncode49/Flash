"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useAtom, useAtomValue } from "jotai";
import { promptAtom, userAtom } from "@/lib/globalAtoms";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PromptInput from "./promptInput";
import prompt from "@/constants/prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Loader } from "lucide-react";

export default function ChatView() {
  // hooks
  const { id } = useParams();
  const convex = useConvex();

  // atoms
  const [promptMessage, setPromptMessage] = useAtom(promptAtom);
  const user = useAtomValue(userAtom);

  // state
  const [loading, setLoading] = useState<boolean>(false);

  // refs
  const isGenerating = useRef<boolean>(false);

  // actions
  const onGetWorkspace = async () => {
    const workspace = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id as Id<"workspace">,
    });
    if (workspace) {
      setPromptMessage(workspace.messages);
    }
  };

  const onGenerateAIResponse = async () => {
    if (isGenerating.current) return; // Prevent multiple executions
    isGenerating.current = true;

    setLoading(true);
    const _prompt = JSON.stringify(promptMessage) + prompt.chatPrompt;
    const response = await axios.post("/api/ai-chat", {
      prompt: _prompt,
    });
    if (response.data.success) {
      setPromptMessage((prev) => [
        ...prev,
        {
          role: "ai",
          message: response.data.data,
        },
      ]);
    }
    setLoading(false);
    isGenerating.current = false;
  };

  // effects
  useEffect(() => {
    id && onGetWorkspace();
  }, [id]);

  useEffect(() => {
    if (promptMessage && promptMessage.length > 0) {
      const role = promptMessage[promptMessage.length - 1].role;
      if (role === "user") {
        onGenerateAIResponse();
      }
    }
  }, [promptMessage]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-5rem)]">
      <div
        className="flex-1 overflow-y-scroll scrollbar-hide rounded-lg"
        style={{
          fontFamily: "Arial",
        }}
      >
        {promptMessage.map((message, index) => (
          <div
            key={index}
            className="px-3 py-2 bg-neutral-700 mb-2 rounded-lg flex items-start gap-2 text-xs font-normal"
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
            <ReactMarkdown className="leading-4">{`${message.role === "ai" ? "⚡" : ""}${message.message}`}</ReactMarkdown>
          </div>
        ))}

        {/* Generating Loader */}
        {loading && (
          <Loader className="animate-spin size-5 text-neutral-300 mx-auto my-2" />
        )}
      </div>
      <div className="sticky bottom-0 z-10 mt-2">
        <PromptInput />
      </div>
    </div>
  );
}

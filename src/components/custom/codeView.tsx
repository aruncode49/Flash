"use client";

import React from "react";
import { codeEditorData } from "@/constants/codeEditor";
import prompt from "@/constants/prompt";
import { promptAtom } from "@/lib/globalAtoms";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { useAtomValue } from "jotai";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ICodeView {
  isFullSize: boolean;
  onChangeFullSize: () => void;
}

// constant
const activeTabClasses = "bg-blue-500/30 text-blue-500";

export default function CodeView({ isFullSize, onChangeFullSize }: ICodeView) {
  // hooks
  const onUpdateWorkspaceCode = useMutation(api.workspace.updateWorkspaceCode);
  const convex = useConvex();
  const { id } = useParams();

  // states
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [files, setFiles] = useState(codeEditorData.defaultFiles);
  const [isFetchingWorkspace, setIsFetchingWorkspace] =
    useState<boolean>(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState<boolean>(false);

  // atoms
  const promptMessage = useAtomValue(promptAtom);

  // refs
  const isGenerating = useRef<boolean>(false);

  // actions
  const onFetchWorkspace = async () => {
    setIsFetchingWorkspace(true);
    const data = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id as Id<"workspace">,
    });
    const mergedFiles = {
      ...codeEditorData.defaultFiles,
      ...data?.fileData?.files,
    };
    setFiles(mergedFiles);
    setIsFetchingWorkspace(false);
  };

  const onGenerateCodeResponse = async () => {
    if (isGenerating.current) return; // Prevent multiple executions
    isGenerating.current = true;

    setIsGeneratingCode(true);
    const userPrompt = JSON.stringify(promptMessage) + "\n" + prompt.codePrompt;

    const response = await axios.post("/api/ai-code", {
      prompt: userPrompt,
    });

    if (response.data.success && id) {
      const responseData = response.data.data;
      const mergedFiles = {
        ...codeEditorData.defaultFiles,
        ...responseData?.files,
      };
      await onUpdateWorkspaceCode({
        workspaceId: id as Id<"workspace">,
        files: responseData,
      });
      setFiles(mergedFiles);
    } else {
      console.log(response.data.errorMessage);
    }
    isGenerating.current = false;
    setIsGeneratingCode(false);
  };

  // effect
  useEffect(() => {
    if (id) {
      onFetchWorkspace(); // Fetch workspace data
    }
  }, [id]); // Only run when id changes

  useEffect(() => {
    if (promptMessage.length > 0) {
      const role = promptMessage[promptMessage.length - 1].role;
      if (role === "user") {
        onGenerateCodeResponse(); // Generate code response if the user's message is the latest
      }
    }
  }, [promptMessage]); // Only run when promptMessage changes

  return (
    <div
      className={`h-[calc(100vh-5rem)] relative ${isFullSize && "w-[calc(100vw-24px)]"}`}
    >
      {/* loader */}
      {(isFetchingWorkspace || isGeneratingCode) && (
        <div className="absolute inset-0 z-[999] rounded-lg flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50">
          <Loader className="animate-spin" />
          <p>Generating Your Code...</p>
        </div>
      )}

      {/* Resize Window */}
      <div className=" border border-b-0 h-10 rounded-lg rounded-b-none bg-neutral-900 flex items-center pl-1">
        <span
          onClick={onChangeFullSize}
          className="text-neutral-400 cursor-pointer hover:text-white"
        >
          {isFullSize ? (
            <MdKeyboardArrowRight
              title="Close Full Screen"
              className="size-8"
            />
          ) : (
            <MdKeyboardArrowLeft title="Full Screen" className="size-8" />
          )}
        </span>

        <div className="flex items-center text-[12px] ml-2 bg-black h-8 px-2 py-2 rounded-full">
          <h1
            onClick={() => setActiveTab("code")}
            className={`cursor-pointer px-2 py-0.5 rounded-full ${activeTab === "code" && activeTabClasses}`}
          >
            Code
          </h1>
          <h1
            onClick={() => setActiveTab("preview")}
            className={`cursor-pointer px-2 py-0.5 rounded-full ${activeTab === "preview" && activeTabClasses}`}
          >
            Preview
          </h1>
        </div>
      </div>
      <SandpackProvider
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        files={files}
        customSetup={{
          dependencies: {
            ...codeEditorData.dependency,
          },
        }}
        template="react"
        theme="dark"
      >
        <SandpackLayout
          style={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            flexWrap: "nowrap",
          }}
        >
          <SandpackFileExplorer
            style={{
              height: "calc(100vh - 7.5rem)",
              display: activeTab === "preview" ? "none" : "flex",
            }}
          />
          <SandpackCodeEditor
            style={{
              height: "calc(100vh - 7.5rem)",
              display: activeTab === "preview" ? "none" : "flex",
            }}
          />

          <SandpackPreview
            style={{
              height: "calc(100vh - 7.5rem)",
              display: activeTab === "code" ? "none" : "flex",
            }}
            showNavigator
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

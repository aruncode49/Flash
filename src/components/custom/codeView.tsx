"use client";

import { codeEditorData } from "@/constants/codeEditor";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

// constant
const activeTabClasses = "bg-blue-500/30 text-blue-500";

export default function CodeView() {
  // states
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  return (
    <div className="h-[calc(100vh-5rem)]">
      <div className="w-full border border-b-0 h-10 rounded-lg rounded-b-none bg-neutral-900 flex items-center">
        <div className="flex items-center text-[12px] ml-4 bg-black h-8 px-2 py-2 rounded-full">
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
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer
                style={{ height: "calc(100vh - 7.5rem)" }}
              />
              <SandpackCodeEditor style={{ height: "calc(100vh - 7.5rem)" }} />
            </>
          ) : (
            <SandpackPreview
              style={{ height: "calc(100vh - 7.5rem)" }}
              showNavigator
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

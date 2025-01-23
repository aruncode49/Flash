"use client";

import { sandboxActions } from "@/lib/globalAtoms";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ICodeSandboxUrl {
  editorUrl: string;
  embedUrl: string;
  sandboxId: string;
}

export default function SandpackPreviewClient() {
  // hooks
  const { sandpack } = useSandpack();

  // atoms
  const sandboxAction = useAtomValue(sandboxActions);

  // ref
  const previewRef = useRef<SandpackPreviewRef>(null);

  // actions
  const getSandpackPreviewClient = async () => {
    const client = previewRef.current?.getClient();

    if (!client) {
      return;
    }

    // Check if the method exists on the client
    if (
      "getCodeSandboxURL" in client &&
      typeof client.getCodeSandboxURL === "function"
    ) {
      const sandboxUrl = (await client.getCodeSandboxURL()) as ICodeSandboxUrl;

      if (sandboxUrl && sandboxAction.type === "deploy") {
        console.log("Running Deploy");
        window.open(`https://${sandboxUrl.sandboxId}.csb.app/`);
      }

      if (sandboxUrl && sandboxAction.type === "export") {
        window.open(sandboxUrl.editorUrl);
      }
    } else {
      toast.error("Something went wrong with sandbox url.");
    }
  };

  // effect
  useEffect(() => {
    getSandpackPreviewClient();
  }, [sandpack && sandboxAction]);

  return (
    <SandpackPreview
      ref={previewRef}
      style={{
        height: "calc(100vh - 7.5rem)",
      }}
      showNavigator
    />
  );
}

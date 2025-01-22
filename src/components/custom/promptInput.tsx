"use client";

import { globalStringConstants } from "@/constants/globalStringConstants";
import { Button } from "../ui/button";
import { Loader as LoaderIcon, MoveRight } from "lucide-react";
import { BsStars } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authDialogAtom, promptAtom, userAtom } from "@/lib/globalAtoms";
import AuthDialog from "./authDialog";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./loader";

export default function PromptInput() {
  // hooks
  const onCreateWorkspace = useMutation(api.workspace.createWorkspace);
  const router = useRouter();
  const pathName = usePathname();

  // state
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // atoms
  const setPromptMessage = useSetAtom(promptAtom);
  const user = useAtomValue(userAtom);
  const [isAuthDialogOpen, setAuthDialogOpen] = useAtom(authDialogAtom);

  // actions
  const onGenerateResult = async (
    e: FormEvent | KeyboardEvent | MouseEvent,
    suggestion?: string
  ) => {
    e.preventDefault();

    // open auth dialog if the user is not authenticated
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }

    if (!pathName.includes("workspace")) {
      setLoading(true);
      const workspaceId = await onCreateWorkspace({
        messages: [
          {
            role: "user",
            message: suggestion ?? prompt,
          },
        ],
        userId: user.id,
      });
      router.push(`/workspace/${workspaceId}`);
    }

    setPromptMessage((prev) => [
      ...prev,
      {
        message: suggestion ?? prompt,
        role: "user",
      },
    ]);

    setPrompt("");
    setLoading(false);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior of "Enter" adding a newline
      if (prompt.trim()) {
        onGenerateResult(e);
      }
    }
  };

  useEffect(() => {
    if (!pathName.includes("workspace")) {
      setPromptMessage([]); // reset prompt message when user navigate to any other page than workspace
    }
  }, []);

  return (
    <div
      className={`w-full ${!pathName.includes("workspace") && "sm:w-[30rem]"}`}
    >
      <div className="bg-gradient-to-br rounded-lg w-full p-[0.7px] pb-0 from-blue-500 via-green-500 via-20% to-60% to-transparent mx-auto">
        <form
          onSubmit={onGenerateResult}
          className="bg-neutral-900 h-[8rem] p-3 rounded-lg border border-l-0 border-neutral-700"
        >
          <div className="flex h-[70%] gap-2">
            <textarea
              className="w-full outline-none bg-transparent resize-none text-xs font-normal"
              placeholder={globalStringConstants.promptInputPlaceholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={onKeyPress}
            />
            {prompt !== "" && (
              <Button
                type="submit"
                variant="secondary"
                size="icon"
                className="h-7 w-8"
              >
                {loading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <MoveRight />
                )}
              </Button>
            )}
          </div>
          <BsStars className="mt-3 text-neutral-700" />
        </form>
      </div>

      {!pathName.includes("workspace") && (
        <div className="mt-8 flex flex-wrap text-[12px] max-w-xl mx-auto justify-center gap-x-4 gap-y-2">
          {globalStringConstants.promptSuggestions.map((value, index) => (
            <div
              onClick={() => onGenerateResult(new MouseEvent("click"), value)}
              className="p-1 px-4 rounded-full border cursor-pointer text-neutral-400 hover:text-white transition-all hover:bg-neutral-900"
              key={index}
            >
              {value}
            </div>
          ))}
        </div>
      )}

      {/* Auth Dialog */}
      <AuthDialog
        open={isAuthDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
      />

      {/* Suggestion Loader */}
      {prompt === "" && loading && <Loader />}
    </div>
  );
}

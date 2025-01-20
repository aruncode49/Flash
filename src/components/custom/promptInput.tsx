"use client";

import { globalStringConstants } from "@/constants/globalStringConstants";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { BsStars } from "react-icons/bs";
import { FormEvent, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { promptAtom, userAtom } from "@/lib/globalAtoms";
import AuthDialog from "./authDialog";

export default function PromptInput() {
  // state
  const [prompt, setPrompt] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // atoms
  const setPromptMessage = useSetAtom(promptAtom);
  const user = useAtomValue(userAtom);

  // actions
  const onGenerateResult = (
    e: FormEvent | KeyboardEvent,
    suggestion?: string
  ) => {
    e.preventDefault();

    // open auth dialog if the user is not authenticated
    if (!user) {
      setIsDialogOpen(true);
      return;
    }

    setPromptMessage({
      role: "user",
      message: suggestion ?? prompt,
    });

    setPrompt("");
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior of "Enter" adding a newline
      if (prompt.trim()) {
        onGenerateResult(e);
      }
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="bg-gradient-to-br rounded-lg w-full sm:w-[30rem] p-[0.7px] pb-0 from-blue-500 via-green-500 via-20% to-60% to-transparent mx-auto">
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
                <MoveRight />
              </Button>
            )}
          </div>
          <BsStars className="mt-3 text-neutral-700" />
        </form>
      </div>

      <div className="mt-8 flex flex-wrap text-[12px] max-w-xl mx-auto justify-center gap-x-4 gap-y-2">
        {globalStringConstants.promptSuggestions.map((value, index) => (
          <div
            className="p-1 px-4 rounded-full border cursor-pointer text-neutral-400 hover:text-white transition-all hover:bg-neutral-900"
            key={index}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Auth Dialog */}
      <AuthDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

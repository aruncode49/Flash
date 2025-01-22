"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authDialogAtom, promptAtom, userAtom } from "@/lib/globalAtoms";
import { globalStringConstants } from "@/constants/globalStringConstants";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function Header() {
  // hooks
  const convex = useConvex();
  const pathName = usePathname();

  // state

  // atoms
  const [user, setUser] = useAtom(userAtom);
  const promptMessage = useAtomValue(promptAtom);
  const setAuthDialogOpen = useSetAtom(authDialogAtom);

  // actions
  const getUser = async (userId: Id<"users">) => {
    const user = await convex.query(api.users.getUser, {
      id: userId,
    });
    if (user) {
      setUser({
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      });
    }
  };

  // effect
  useEffect(() => {
    const userId = Cookies.get(globalStringConstants.userId);
    if (!user && userId) {
      getUser(userId as Id<"users">);
    }
  }, []);

  return (
    <>
      <nav
        className={`p-3 fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 shadow-md backdrop-blur-xl ${pathName.includes("workspace") && "border-b"}`}
      >
        <Logo />

        {pathName.includes("workspace") && (
          <p
            title={promptMessage[0]?.message}
            className="text-sm capitalize z-50 max-w-[18rem] line-clamp-1"
          >
            {promptMessage[0]?.message}
          </p>
        )}

        {!user ? (
          <Button onClick={() => setAuthDialogOpen(true)} variant="secondary">
            Get Started
          </Button>
        ) : (
          pathName.includes("workspace") && (
            <div className="flex items-center gap-2">
              <Button variant="secondary">Export</Button>
              <Button className="bg-amber-700 hover:bg-amber-600">
                Deploy
              </Button>
            </div>
          )
        )}

        {/* Lighting effect */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r h-28 from-sky-600 to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-0 h-10 w-40 bg-gradient-to-r from-green-500 to-transparent opacity-80 blur-2xl rounded-full pointer-events-none" />
      </nav>
    </>
  );
}

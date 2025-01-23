"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  authDialogAtom,
  promptAtom,
  sandboxActions,
  userAtom,
} from "@/lib/globalAtoms";
import { globalStringConstants } from "@/constants/globalStringConstants";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./logo";
import { TPlans } from "@/interfaces/user";
import { LuDownload, LuRocket } from "react-icons/lu";
import Image from "next/image";
import { useSidebar } from "../ui/sidebar";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useRef } from "react";

export default function Header() {
  // hooks
  const convex = useConvex();
  const pathName = usePathname();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  // state

  // refs
  const loadingRef = useRef<LoadingBarRef>(null);

  // atoms
  const [user, setUser] = useAtom(userAtom);
  const promptMessage = useAtomValue(promptAtom);
  const setAuthDialogOpen = useSetAtom(authDialogAtom);
  const setSandboxAction = useSetAtom(sandboxActions);

  // actions
  const getUser = async (userId: Id<"users">) => {
    loadingRef.current?.continuousStart();
    const user = await convex.query(api.users.getUser, {
      id: userId,
    });
    if (user) {
      setUser({
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        token: user.token ?? 0,
        activePlan: user.activePlan as TPlans,
      });
    }
    loadingRef.current?.complete();
  };

  const onSetSandboxAction = (type: "deploy" | "export") => {
    setSandboxAction({
      type,
      timestamp: Date.now().toString(),
    });
  };

  // effect
  useEffect(() => {
    const userId = Cookies.get(globalStringConstants.userId);
    if (!user && userId) {
      getUser(userId as Id<"users">);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <LoadingBar color="#22c55e" ref={loadingRef} shadow={true} />
      <nav
        className={`p-3 fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 shadow-md backdrop-blur-xl ${pathName.includes("workspace") && "border-b"}`}
      >
        <Logo />

        {pathName.includes("workspace") && (
          <p
            title={promptMessage[0]?.message}
            className="text-xs capitalize z-50 max-w-[18rem] ml-14 line-clamp-1 hidden md:block"
          >
            {promptMessage[0]?.message}
          </p>
        )}

        {!user ? (
          <Button onClick={() => setAuthDialogOpen(true)} variant="secondary">
            Get Started
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            {pathName.includes("workspace") && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onSetSandboxAction("export")}
                  variant="secondary"
                >
                  <LuDownload />
                  Export
                </Button>
                <Button
                  onClick={() => onSetSandboxAction("deploy")}
                  className="bg-amber-700 hover:bg-amber-600"
                >
                  <LuRocket />
                  Deploy
                </Button>
              </div>
            )}

            {!pathName.includes("pricing") && user && user?.picture && (
              <Image
                src={user.picture}
                alt="User Image"
                width={30}
                height={30}
                title="User Profile"
                className="rounded-full cursor-pointer hover:opacity-80"
                onClick={toggleSidebar}
              />
            )}
          </div>
        )}

        {/* Lighting effect */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r h-28 from-sky-600 to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-0 h-10 w-40 bg-gradient-to-r from-green-500 to-transparent opacity-80 blur-2xl rounded-full pointer-events-none" />
      </nav>
    </>
  );
}

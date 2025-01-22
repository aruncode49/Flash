"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { Racing_Sans_One } from "next/font/google";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/globalAtoms";
import { globalStringConstants } from "@/constants/globalStringConstants";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import { usePathname } from "next/navigation";

const logoFont = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  // hooks
  const convex = useConvex();
  const pathName = usePathname();

  // state

  // atoms
  const [user, setUser] = useAtom(userAtom);

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
        <Link href="/">
          <h1 className={`${logoFont.className} text-xl text-white`}>
            Flash⚡
          </h1>
        </Link>

        {/* Get Started Button (Open SignIn Dialog) */}
        {!user && <Button variant="secondary">Get Started</Button>}

        {/* Export & Deploy Button */}
        {/* Export */}
        {/* Deploy */}

        {/* Lighting effect */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r h-28 from-sky-600 to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-0 h-10 w-40 bg-gradient-to-r from-green-500 to-transparent opacity-80 blur-2xl rounded-full pointer-events-none" />
      </nav>
    </>
  );
}

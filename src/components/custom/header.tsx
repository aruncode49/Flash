"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { Racing_Sans_One } from "next/font/google";
import Cookies from "js-cookie";
import { getUserInfo } from "@/lib/getUserInfo";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/globalAtoms";
import { globalStringConstants } from "@/constants/globalStringConstants";

const logoFont = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  // atoms
  const [user, setUser] = useAtom(userAtom);

  // effect
  useEffect(() => {
    if (!user) {
      const flashAccessToken = Cookies.get(
        globalStringConstants.flashAccessTokenKey
      );
      if (flashAccessToken) {
        getUserInfo(flashAccessToken).then((userInfo) => {
          if (userInfo && userInfo.data) {
            setUser(userInfo.data);
          }
        });
      }
    }
  }, []);

  return (
    <nav className="px-2 sm:px-5 py-3 fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-12 shadow-md backdrop-blur-xl">
      <h1 className={`${logoFont.className} text-xl text-white`}>Flash⚡</h1>

      <div className="flex items-center gap-2">
        <Button>Signin</Button>
        <Button variant="secondary">Get Started</Button>
      </div>

      {/* Lighting effect */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r h-28 from-sky-600 to-transparent opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 top-0 h-10 w-40 bg-gradient-to-r from-green-500 to-transparent opacity-80 blur-2xl rounded-full pointer-events-none" />
    </nav>
  );
}

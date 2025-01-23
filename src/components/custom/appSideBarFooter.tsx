"use client";

import { userAtom } from "@/lib/globalAtoms";
import { useAtom } from "jotai";
import { LogOut, Wallet } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function AppSideBarFooter() {
  // hooks
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  // atoms
  const [user, setUser] = useAtom(userAtom);

  // actions
  const onNavigateToPricing = () => {
    router.push("/pricing");
    toggleSidebar();
  };

  const onSignOut = () => {
    Cookies.remove("user_id");
    setUser(null);
    router.push("/");
    toggleSidebar();
    toast.success("You are logged out successfully!");
  };

  // vars
  const footerData = [
    {
      id: 1,
      title: "My Subscription",
      icon: Wallet,
      onClick: onNavigateToPricing,
    },
    {
      id: 2,
      title: "Sign Out",
      icon: LogOut,
      onClick: onSignOut,
    },
  ];

  return (
    <div className="px-1 flex flex-col gap-2 pt-3">
      {footerData.map((item) => (
        <div
          className="text-xs flex items-center gap-2 p-2 px-3 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
          key={item.id}
          onClick={item.onClick}
        >
          <item.icon className="size-4" />
          <p>{item.title}</p>
        </div>
      ))}

      {/* user detatils */}
      {user && user?.picture && (
        <div className="flex items-center gap-3 p-4 mt-2 px-0 border-t border-neutral-600 border-dashed">
          <Image
            src={user.picture}
            alt="User Image"
            width={30}
            height={30}
            title="User Profile"
            className="rounded-full"
          />

          <p className="text-sm ">{user.name}</p>
        </div>
      )}
    </div>
  );
}

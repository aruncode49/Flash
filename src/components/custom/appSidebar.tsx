"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import ChatHistory from "./chatHistory";
import AppSideBarFooter from "./appSideBarFooter";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  const router = useRouter();

  return (
    <div className="absolute">
      <Sidebar className="z-50">
        <SidebarHeader className="px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="w-fit">
              <Logo />
            </div>
            <span className="cursor-pointer" onClick={toggleSidebar}>
              <TbLayoutSidebarLeftCollapse className="size-5" />
            </span>
          </div>

          <Button
            onClick={() => {
              router.push("/");
              toggleSidebar();
            }}
            className="bg-white text-black hover:bg-neutral-200 mt-5"
          >
            <MessageCircleCode />
            Start New Chat
          </Button>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarGroup>
            <ChatHistory />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AppSideBarFooter />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

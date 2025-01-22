"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import ChatHistory from "./chatHistory";
import AppSideBarFooter from "./appSideBarFooter";

export default function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="px-3 py-3">
        <Logo />
        <Button className="bg-white text-black hover:bg-neutral-200 mt-2">
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
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeProvider";
import Header from "@/components/custom/header";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexClientProvider } from "@/lib/convexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/appSidebar";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flash",
  description: "Build what you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ConvexClientProvider>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string}
        >
          <body className={`${interFont.className} antialiased px-3 pl-2`}>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <Header />
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <main className="h-[calc(100vh-3.5rem)] mt-14 w-full">
                  {children}
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </body>
        </GoogleOAuthProvider>
      </ConvexClientProvider>
    </html>
  );
}

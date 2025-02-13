import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeProvider";
import Header from "@/components/custom/header";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexClientProvider } from "@/lib/convexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/appSidebar";
import PaypalProvider from "@/lib/paypalProvider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/custom/footer";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flash AI",
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
          <PaypalProvider>
            <body className={`${interFont.className} antialiased px-3 pl-2`}>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <SidebarProvider defaultOpen={false}>
                  <Header />
                  <AppSidebar />
                  <main className="h-[calc(100vh-3.5rem)] mt-14 w-full">
                    {children}
                  </main>
                  <Footer />
                  <Toaster richColors closeButton />
                </SidebarProvider>
              </ThemeProvider>
            </body>
          </PaypalProvider>
        </GoogleOAuthProvider>
      </ConvexClientProvider>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeProvider";
import Header from "@/components/custom/header";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexClientProvider } from "@/lib/convexClientProvider";

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
          <body className={`${interFont.className} antialiased px-3`}>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <Header />
              <main className="h-[calc(100vh-3rem)] mt-12">{children}</main>
            </ThemeProvider>
          </body>
        </GoogleOAuthProvider>
      </ConvexClientProvider>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeProvider";

export const metadata: Metadata = {
  title: "Boom",
  description: "Build what you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

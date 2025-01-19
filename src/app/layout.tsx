import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeProvider";
import Header from "@/components/custom/header";
import { Inter } from "next/font/google";

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
      <body className={`${interFont.className} antialiased px-3`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="h-[calc(100vh-4rem)] mt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

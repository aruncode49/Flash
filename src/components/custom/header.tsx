import { Button } from "../ui/button";
import { Racing_Sans_One } from "next/font/google";

const logoFont = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  return (
    <nav className="px-2 sm:px-5 py-3 sticky flex items-center justify-between h-12">
      <h1 className={`${logoFont.className} text-xl`}>Flash⚡</h1>

      <div className="flex items-center gap-2">
        <Button>Signin</Button>
        <Button variant="secondary">Get Started</Button>
      </div>

      {/* Lighting effect */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-r h-28 from-sky-600 to-transparent opacity-30 blur-3xl" />
      <div className="absolute -z-10 left-1/4 inset-0 bg-gradient-to-r h-10 w-40 bg-green-500 opacity-35 blur-2xl rounded-full" />
    </nav>
  );
}

import Link from "next/link";
import { Racing_Sans_One } from "next/font/google";

const logoFont = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  return (
    <Link href="/" className="z-50">
      <h1 className={`${logoFont.className} text-xl text-white`}>Flash⚡</h1>
    </Link>
  );
}

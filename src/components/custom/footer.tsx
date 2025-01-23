"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  const pathName = usePathname();

  if (pathName.includes("workspace")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 text-center mr-10 mb-4 flex items-center bg-black  gap-5 text-xl text-neutral-300">
      <Link
        className="hover:text-white"
        href="https://github.com/aruncode49"
        target="_blank"
      >
        <FaGithub />
      </Link>
      <Link
        className="hover:text-white"
        href="https://www.linkedin.com/in/aruncode49/"
        target="_blank"
      >
        <FaLinkedin />
      </Link>
      <Link
        className="hover:text-white"
        href="mailto:aruncode49@gmail.com"
        target="_blank"
      >
        <IoMail />
      </Link>
    </div>
  );
}

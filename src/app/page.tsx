import PromptInput from "@/components/custom/promptInput";
import { globalStringConstants } from "@/constants/globalStringConstants";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <section className="flex justify-center items-center h-full pb-10">
      <div className="flex flex-col items-center text-center relative mt-8">
        <Link
          href="https://www.linkedin.com/in/aruncode49/"
          target="_blank"
          className="absolute -top-12 z-50 text-[9px] text-center border border-neutral-700 px-3 py-1 rounded-full flex items-center gap-2 text-neutral-300 hover:text-white"
        >
          <FaLinkedin className="size-3" />
          Introducing Flash: Developed by Arun Kumar
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold px-10">
          {globalStringConstants.heroTitle}
        </h1>
        <p className="mt-3 text-neutral-400 text-sm">
          {globalStringConstants.heroDescription}
        </p>
        <div className="mt-8">
          <PromptInput />
        </div>
      </div>
    </section>
  );
}

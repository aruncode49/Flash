import { IUser } from "@/interfaces/user";
import { atom } from "jotai";

export const userAtom = atom<IUser | null>(null);

export const promptAtom = atom<{
  role: "user" | null;
  message: string;
}>({
  role: null,
  message: "",
});

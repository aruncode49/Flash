import { IPromptMessage } from "@/interfaces/promptMessage";
import { IUser } from "@/interfaces/user";
import { atom } from "jotai";

export const userAtom = atom<IUser | null>(null);

export const promptAtom = atom<IPromptMessage[]>([]);

export const authDialogAtom = atom<boolean>(false);

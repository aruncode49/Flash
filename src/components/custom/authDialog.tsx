"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { globalStringConstants } from "@/constants/globalStringConstants";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/globalAtoms";
import Cookies from "js-cookie";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { IUser } from "@/interfaces/user";
import axios from "axios";

interface IAuthDialog {
  open: boolean;
  onClose: () => void;
}

export default function AuthDialog({ open, onClose }: IAuthDialog) {
  // hooks
  const createUser = useMutation(api.users.createUser);

  // atoms state
  const setUser = useSetAtom(userAtom);

  // actions
  const getUserInfo = async (accessToken: string) => {
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return userInfo;
  };

  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await getUserInfo(tokenResponse.access_token);
      if (userInfo && userInfo.data) {
        const data = userInfo.data as IUser;

        // save user data in db and set the user uid in cookies
        const userId = await createUser({
          email: data.email,
          name: data.name,
          picture: data.picture,
        });

        setUser({ ...data, id: userId });
        Cookies.set(globalStringConstants.userId, userId, {
          expires: 7,
        });
        onClose(); // close the dialog
      }
    },
    onError: (errorResponse) => console.log(errorResponse.error_description),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-neutral-900 p-10 border-neutral-700">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="">
            {globalStringConstants.authTitle}
          </DialogTitle>
          <DialogDescription />
          <div className="space-y-6 text-center flex flex-col items-center">
            <p className="text-xs text-neutral-300">
              {globalStringConstants.authDescription}
            </p>
            <Button onClick={() => onGoogleLogin()} size="sm" className="mt-5">
              <FcGoogle />
              {globalStringConstants.signInWithGoogle}
            </Button>
            <p className="text-xs text-neutral-400 ">
              {globalStringConstants.authFooter}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

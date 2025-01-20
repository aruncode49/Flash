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
import axios from "axios";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/globalAtoms";

interface IAuthDialog {
  open: boolean;
  onClose: () => void;
}

export default function AuthDialog({ open, onClose }: IAuthDialog) {
  // atoms state
  const setUser = useSetAtom(userAtom);

  // action
  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      if (userInfo && userInfo.data) {
        setUser(userInfo.data);

        // save user in database
        // ------------

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

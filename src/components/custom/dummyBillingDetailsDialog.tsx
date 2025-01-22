"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";

interface IDummyBillingDetailsDialog {
  open: boolean;
  onClose: () => void;
}

const testCardDetails = [
  { label: "Name", value: "John Doe" },
  { label: "Address Line 1", value: "123 Main Street" },
  { label: "Address Line 2", value: "Apt 4B" },
  { label: "City", value: "Los Angeles" },
  { label: "State", value: "California (CA)" },
  { label: "ZIP Code", value: "90210" },
  { label: "Country", value: "United States" },
  { label: "Phone", value: "+1 (555) 123-4567" },
  { label: "Email", value: "johndoe@example.com" },
  { label: "Card Number", value: "4032039543880951" },
  { label: "Expiration Date", value: "02/2075" },
  { label: "CVV", value: "448" },
];

export default function DummyBillingDetailsDialog({
  open,
  onClose,
}: IDummyBillingDetailsDialog) {
  // actions
  const onCopy = async (val: string) => {
    await navigator.clipboard.writeText(val);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="z-[999]">
        <DialogHeader>
          <DialogTitle>Card Details For Your Reference</DialogTitle>
          <DialogDescription>
            Use the following details for testing purposes in PayPal.
          </DialogDescription>
        </DialogHeader>

        <ul className="text-sm flex flex-col gap-2">
          {testCardDetails.map((detail, index) => (
            <div key={index} className="flex items-center gap-2">
              <p>{detail.label}</p>
              {" - "}
              <p className="px-2 py-1 bg-neutral-800 text-xs rounded-lg">
                {detail.value}
              </p>
              <span
                onClick={() => onCopy(detail.value)}
                className="p-1 ml-2 cursor-pointer border rounded-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <FaCopy />
              </span>
            </div>
          ))}
        </ul>
        <p className="mt-2 text-sm text-gray-400">
          Note: You can generate new test card from{" "}
          <Link
            className="hover:underline text-blue-500"
            target="_blank"
            href="https://developer.paypal.com/tools/sandbox/card-testing/"
          >
            this page.
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}

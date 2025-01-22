"use client";

import { Button } from "@/components/ui/button";
import { pricingConstants } from "@/constants/pricing";
import { userAtom } from "@/lib/globalAtoms";
import { useAtomValue } from "jotai";

export default function PricingPage() {
  // atoms
  const user = useAtomValue(userAtom);

  return (
    <div className="flex flex-col justify-center items-center pb-10">
      <h1 className="text-3xl font-bold">Pricing⚡</h1>
      <p className="text-sm mt-4 max-w-screen-sm text-center text-neutral-300">
        {pricingConstants.description}
      </p>

      <div className="flex items-center justify-between w-full max-w-screen-md p-4 text-sm bg-neutral-900 border rounded-lg mt-6">
        <p className="font-medium">
          {user?.token}
          <span className="text-neutral-300 font-normal ml-1">Token Left</span>
        </p>
        <div className="text-xs text-neutral-300">
          <p>Need more token?</p>
          <p>Upgrade your plan below.</p>
        </div>
      </div>

      {/* pricing cards */}
      <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-5">
        {pricingConstants.plans.map((plan, index) => (
          <div
            className="p-5 rounded-lg border flex flex-col justify-between gap-2 shadow-sm shadow-amber-500"
            key={index}
          >
            <h2 className="font-bold text-xl">{plan.name}</h2>
            <p className="text-sm font-semibold">{plan.tokens} Tokens</p>
            <p className="text-xs text-neutral-400">{plan.desc}</p>
            <h1 className="text-lg font-bold text-center">${plan.price}</h1>
            <Button
              disabled={plan.name === user?.activePlan}
              className="bg-amber-700 hover:bg-amber-600"
            >
              {plan.name === user?.activePlan
                ? "Current Plan"
                : `Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

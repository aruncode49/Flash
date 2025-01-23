"use client";

import { pricingConstants } from "@/constants/pricing";
import { userAtom } from "@/lib/globalAtoms";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { useAtom } from "jotai";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import Loader from "@/components/custom/loader";
import { TPlans } from "@/interfaces/user";
import { Button } from "@/components/ui/button";
import DummyBillingDetailsDialog from "@/components/custom/dummyBillingDetailsDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  // hooks
  const onUpdateUserToken = useMutation(api.users.updateUserToken);
  const onUpdateUserPlan = useMutation(api.users.updateUserPlan);
  const router = useRouter();

  // atoms
  const [user, setUser] = useAtom(userAtom);

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  // actions
  const onPaymentSuccess = async (tokenValue: number, plan: TPlans) => {
    if (!user) return;
    try {
      setLoading(true);
      const token = user?.token + (plan === "Free" ? 0 : tokenValue);
      await onUpdateUserToken({
        userId: user.id as Id<"users">,
        token: token,
      });
      await onUpdateUserPlan({
        userId: user.id as Id<"users">,
        activePlan: plan,
      });
      setUser({
        ...user,
        token: token,
        activePlan: plan,
      });
    } catch (error) {
      toast.error(error instanceof Error && error.message);
    } finally {
      setLoading(false);
      toast.success(
        "Plan upgraded successfully! Your tokens has been added into your account."
      );
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pb-10">
      {loading && <Loader />}
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

            {plan.name === user?.activePlan ? (
              // Render a message for the current plan
              <Button className="hover:bg-neutral-800 cursor-default text-green-400">
                Active Plan
              </Button>
            ) : plan.name === "Free" ? (
              // Render the "Choose Free Plan" button
              <Button
                onClick={() =>
                  onPaymentSuccess(plan.value, plan.name as TPlans)
                }
                className="bg-amber-700 hover:bg-amber-600"
              >
                Choose Free Plan
              </Button>
            ) : (
              // Render the PayPal button for paid plans
              <PayPalButtons
                onApprove={() =>
                  onPaymentSuccess(plan.value, plan.name as TPlans)
                }
                onCancel={() => console.log("Payment Cancelled")}
                createOrder={(_, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: plan.price.toString(),
                          currency_code: "USD",
                        },
                      },
                    ],
                    intent: "CAPTURE",
                  });
                }}
                style={{
                  layout: "horizontal",
                  tagline: false,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <Button onClick={() => setOpen(true)} className="mx-auto mt-10">
        See Test Card Details
      </Button>
      <DummyBillingDetailsDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

export default function PaypalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
